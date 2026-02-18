import process from 'node:process'
import { resolve, join, basename, extname } from 'node:path'
import { promises as fsp, existsSync } from 'node:fs'
import * as yml from 'js-yaml'
import { globby } from 'globby'
import defu from 'defu'
import pLimit from 'p-limit'
import { $fetch } from 'ofetch'
import { isCI } from 'std-env'
import { Octokit } from '@octokit/rest'
import dotenv from 'dotenv'

import { categories } from './categories.ts'
import type { ModuleInfo, SyncRegression, SyncResult, SyncAllResult, SyncError, SyncProgressCallback } from './types.ts'
import { fetchGithubPkg, fetchModuleJson, modulesDir, distDir, distFile, rootDir, userAgent, getMajorVersions, mergeCompatibilityRanges, isNuxt4Compatible, isRealDocsUrl, parseNpmUrl, npmPackageExists } from './utils.ts'

const maintainerSocialCache: Record<string, null | { user: { name: string, email: string, socialAccounts: { nodes: Array<{ displayName: string, provider: string, url: string }> } } }> = {}

dotenv.config()

export async function sync(name: string, repo?: string, isNew: boolean = false): Promise<SyncResult> {
  const mod = await getModule(name)
  const regressions: SyncRegression[] = []

  // Store original values for regression detection
  const originalWebsite = mod.website
  const originalCompatibility = mod.compatibility.nuxt

  // Repo
  if (repo) {
    mod.repo = repo
  }

  if (!mod.repo) {
    throw new Error(`repo not provided for ${name}`)
  }

  // Defaults
  if (!mod.repo && repo) {
    mod.repo = repo
  }
  if (!mod.github) {
    mod.github = `https://github.com/${mod.repo.replace('#', '/tree/')}`
  }
  if (!mod.website) {
    mod.website = mod.github
  }

  // Fetch latest package.json from github
  const pkg = await fetchGithubPkg(mod.repo)
  mod.npm = pkg.name || mod.npm

  // Type
  if (mod.repo.startsWith('nuxt-community/') || mod.repo.startsWith('nuxt-modules/')) {
    mod.type = 'community'
  }
  else if (mod.repo.startsWith('nuxt/')) {
    mod.type = 'official'
  }
  else {
    mod.type = '3rd-party'
  }

  // Category
  if (!mod.category) {
    if (!isNew) {
      throw new Error(`No category for ${name}`)
    }
    else {
      console.log(`[TODO] Add a category to ./modules/${name}.yml`)
    }
  }
  else if (!categories.includes(mod.category)) {
    let newCat = mod.category[0]!.toUpperCase() + mod.category.substr(1)
    if (newCat.length <= 3) {
      newCat = newCat.toUpperCase()
    }
    if (categories.includes(newCat)) {
      mod.category = newCat
    }
    else {
      throw new Error(`Unknown category ${mod.category} for ${mod.name}.\nSupported categories: ${categories.join(', ')}`)
    }
  }

  // ci is flaky with external links
  if (!isCI) {
    for (const key of ['website', 'learn_more'] as const) {
      if (mod[key] && !mod[key].includes('github.com')) {
        const npmPackage = parseNpmUrl(mod[key])
        if (npmPackage) {
          const exists = await npmPackageExists(npmPackage)
          if (!exists) {
            throw new Error(`${key} link references non-existent npm package "${npmPackage}" for ${mod.name}`)
          }
        }
        else {
          try {
            // we just need to test that we get a 200 response (or a valid redirect)
            await $fetch(mod[key], {
              headers: {
                'user-agent': userAgent,
              },
            })
          }
          catch (err) {
            throw new Error(`${key} link is invalid for ${mod.name}: ${err}`)
          }
        }
      }
    }
  }

  // validate icon
  if (mod.icon) {
    const file = resolve(rootDir, 'icons', mod.icon)
    if (!existsSync(file)) {
      throw new Error(`Icon ${mod.icon} does not exist for ${mod.name}`)
    }
  }

  // TODO: Remove extra fields
  const validFields = [
    'name',
    'description',
    'npm',
    'repo',
    'icon',
    'github',
    'website',
    'learn_more',
    'mcp',
    'category',
    'type',
    'maintainers',
    'compatibility',
    'sponsor',
    'aliases',
    'archived',
  ]
  const invalidFields = []
  for (const key in mod) {
    if (!validFields.includes(key)) {
      invalidFields.push(key)

      // @ts-expect-error dynamic delete
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete mod[key]
    }
  }
  if (invalidFields.length) {
    console.warn(`Invalid fields for ./modules/${mod.name}.yml`, invalidFields)
  }

  // Auto name
  if (!mod.name) {
    mod.name = (pkg.name.startsWith('@') ? pkg.name.split('/')[1] : pkg.name)
      .replace('nuxt-', '')
      .replace('-module', '')
  }

  if (mod.aliases) {
    // Force to be an array
    mod.aliases = Array.isArray(mod.aliases) ? mod.aliases : [mod.aliases]
    // Remove name if in it
    mod.aliases = mod.aliases.filter(alias => alias !== mod.name)
  }

  // Maintainers
  // TODO: Sync with maintainers.app
  if (!mod.maintainers.length) {
    const owner = mod.repo.split('/')[0]
    if (owner && owner !== 'nuxt-community' && owner !== 'nuxt') {
      mod.maintainers.push({
        name: owner,
        github: owner,
      })
    }
    else if (!isNew) {
      throw new Error(`No maintainer for ${mod.name}`)
    }
    else {
      console.log(`[TODO] Add a maintainer to ./modules/${name}.yml`)
    }
  }

  if (process.env.GITHUB_TOKEN) {
    const client = new Octokit({ auth: `Bearer ${process.env.GITHUB_TOKEN}` })
    for (const maintainer of mod.maintainers) {
      if (!(maintainer.github in maintainerSocialCache)) {
        console.log('Syncing maintainer socials with GitHub')
        maintainerSocialCache[maintainer.github] = await client.graphql<{ user: { name: string, email: string, socialAccounts: { nodes: Array<{ displayName: string, provider: string, url: string }> } } }>({
          query: `
              query ($login: String!) {
                user (login: $login) {
                  name
                  email
                  socialAccounts(first: 100) {
                    nodes {
                      displayName
                      provider
                      url
                    }
                  }
                }
              }`,
          login: maintainer.github,
        }).catch(() => null)
      }

      const user = maintainerSocialCache[maintainer.github]?.user
      if (user) {
        if (user.name) {
          maintainer.name = user.name
        }
        for (const social of user.socialAccounts.nodes) {
          if (social.provider === 'TWITTER') {
            maintainer.twitter = social.displayName.replace(/^@/, '')
          }
          if (social.provider === 'BLUESKY') {
            maintainer.bluesky = social.displayName.replace(/^@/, '')
          }
        }
      }
    }

    const repoParts = mod.repo.split('#')[0]?.split('/') || []
    const [owner, repoName] = repoParts
    if (owner && repoName) {
      try {
        const { data } = await client.repos.get({ owner, repo: repoName })
        mod.archived = data.archived || undefined // only set if true
      }
      catch (err) {
        console.warn(`Could not check archived status for ${mod.repo}: ${err}`)
      }
    }
  }

  // Default description
  if (!mod.description) {
    mod.description = pkg.description
  }

  const majorVersions = await getMajorVersions(mod.npm)

  const nuxtCompatibilities: string[] = []
  let latestModuleJson: { docs?: string, compatibility?: { nuxt?: string } } | null = null

  for (const version of majorVersions) {
    const moduleJson = await fetchModuleJson(mod.npm, version)
    if (moduleJson) {
      // Keep the latest module.json for other metadata
      if (!latestModuleJson) {
        latestModuleJson = moduleJson
      }

      if (moduleJson.compatibility?.nuxt) {
        nuxtCompatibilities.push(moduleJson.compatibility.nuxt)
      }
    }
  }

  if (nuxtCompatibilities.length > 0) {
    const mergedCompatibility = mergeCompatibilityRanges(nuxtCompatibilities)
    if (mergedCompatibility) {
      mod.compatibility.nuxt = mergedCompatibility

      const wasNuxt4Compatible = isNuxt4Compatible(originalCompatibility)
      const isNowNuxt4Compatible = isNuxt4Compatible(mergedCompatibility)
      if (wasNuxt4Compatible && !isNowNuxt4Compatible) {
        regressions.push({
          type: 'compatibility',
          moduleName: mod.name,
          repo: mod.repo,
          currentValue: originalCompatibility,
          moduleValue: mergedCompatibility,
          description: `Module was marked as Nuxt 4 compatible (${originalCompatibility}) but module.json indicates only ${mergedCompatibility}`,
        })
      }
    }
  }

  // Always use docs URL from module.json if present (module is source of truth)
  if (latestModuleJson?.docs) {
    const newWebsite = latestModuleJson.docs

    // Detect docs URL regression: was a real docs site, now it's just GitHub
    const wasRealDocsUrl = isRealDocsUrl(originalWebsite)
    const isNowRealDocsUrl = isRealDocsUrl(newWebsite)
    if (wasRealDocsUrl && !isNowRealDocsUrl) {
      regressions.push({
        type: 'docs-url',
        moduleName: mod.name,
        repo: mod.repo,
        currentValue: originalWebsite,
        moduleValue: newWebsite,
        description: `Module had a documentation site (${originalWebsite}) but module.json now points to ${newWebsite}`,
      })
    }

    mod.website = newWebsite
  }

  // Write module
  await writeModule(mod)

  return { module: mod, regressions }
}

export async function getModule(name: string): Promise<ModuleInfo> {
  let mod: ModuleInfo = {
    name,
    description: '',
    repo: '', // nuxt/example
    npm: '', // @nuxt/core
    icon: '', // url or filename from /public/icons
    github: '', // github link
    website: '',
    learn_more: '',
    category: 'Devtools', // see modules/_categories.json
    type: '3rd-party', // official, community, 3rd-party
    maintainers: [],
    compatibility: {
      nuxt: '>=3.0.0',
      requires: {},
    },
  }

  const file = resolve(modulesDir, name + '.yml')
  if (existsSync(file)) {
    mod = defu(yml.load(await fsp.readFile(file, 'utf-8')) as object, mod)
  }

  return mod
}

export async function writeModule(module: ModuleInfo) {
  const file = resolve(modulesDir, `${module.name}.yml`)
  await fsp.writeFile(file, yml.dump(module), 'utf8')
}

export async function readModules() {
  const globPattern = join(modulesDir, '*.yml').replace(/\\/g, '/')
  const names = (await globby(globPattern)).map(p => basename(p, extname(p))).filter(_ => _)

  return Promise.all(names.map(n => getModule(n)))
    .then(modules => modules.filter(m => m.name))
}

export async function syncAll(onProgress?: SyncProgressCallback): Promise<SyncAllResult> {
  const modules = await readModules()
  const total = modules.length
  const synced: string[] = []
  const errors: SyncError[] = []
  const regressions: SyncRegression[] = []
  const archivedModules: string[] = []

  let completed = 0
  const limit = pLimit(10)

  await Promise.all(modules.map(module => limit(async () => {
    try {
      const result = await sync(module.name, module.repo)
      synced.push(module.name)

      if (result.regressions.length > 0) {
        regressions.push(...result.regressions)
      }
      if (result.module.archived) {
        archivedModules.push(module.name)
      }
    }
    catch (err) {
      errors.push({
        moduleName: module.name,
        error: err instanceof Error ? err : new Error(String(err)),
      })
    }
    finally {
      completed++
      onProgress?.(completed, total, module.name)
    }
  })))

  return { total, synced, errors, regressions, archivedModules }
}

export async function build() {
  const modules = await readModules()
  await fsp.mkdir(distDir, { recursive: true })
  await fsp.writeFile(distFile, JSON.stringify(modules, null, 2))
}
