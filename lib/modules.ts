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

import { categories } from './categories'
import type { ModuleInfo } from './types'
import { fetchGithubPkg, modulesDir, distDir, distFile, rootDir } from './utils'

const maintainerSocialCache: Record<string, null | { user: { name: string, email: string, socialAccounts: { nodes: Array<{ displayName: string, provider: string, url: string }> } } }> = {}

dotenv.config()

export async function sync(name: string, repo?: string, isNew: boolean = false) {
  const mod = await getModule(name)

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
        // we just need to test that we get a 200 response (or a valid redirect)
        await $fetch(mod[key]).catch((err) => {
          throw new Error(`${key} link is invalid for ${mod.name}: ${err}`)
        })
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
    'category',
    'type',
    'maintainers',
    'compatibility',
    'sponsor',
    'aliases',
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
  }

  // Default description
  if (!mod.description) {
    mod.description = pkg.description
  }

  // Compatibility

  // Write module
  await writeModule(mod)

  return mod
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
      nuxt: '^2.0.0',
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

export async function syncAll() {
  const modules = await readModules()
  const limit = pLimit(10)
  let success = true
  const updatedModules = await Promise.allSettled(modules.map(module => limit(() => {
    console.log(`Syncing ${module.name}`)
    return sync(module.name, module.repo).catch((err) => {
      console.error(`Error syncing ${module.name}`)
      console.error(err)
      success = false
    })
  })))
  return { count: updatedModules.length, success }
}

export async function build() {
  const modules = await readModules()
  await fsp.mkdir(distDir, { recursive: true })
  await fsp.writeFile(distFile, JSON.stringify(modules, null, 2))
}
