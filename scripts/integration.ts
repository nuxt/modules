import { existsSync, readFile, writeFile, remove, mkdirp } from 'fs-extra'
import { resolve, join, basename, extname } from 'path'
import * as yml from 'js-yaml'
import globby from 'globby'
import defu from 'defu'
import { fetchGithubPkg, uniq, integrationsDir, rootDir, distDir, distFile  } from './utils'

export async function sync(name, repo?: string) {
  const integration = await getIntegration(name)

  // Repo
  if (repo) {
    integration.repo = repo
  }

  if (!integration.repo) {
    throw new Error('repo not provided for ' + name)
  }

  // Defaults
  if (!integration.repo) {
    integration.repo = repo
  }
  if (!integration.github) {
    integration.github = 'https://github.com/' + integration.repo.replace('#', '/tree/')
  }
  if (!integration.website) {
    integration.website = integration.github
  }

  // Fetch latest package.json from github
  const pkg = await fetchGithubPkg(integration.repo)
  integration.npm = pkg.name

  // Labels
  if (integration.repo.startsWith('nuxt-community/')) {
    integration.labels.push('community')
  } else if (integration.repo.startsWith('nuxt/')) {
    integration.labels.push('official')
  } else {
    integration.labels.push('3rd-party')
  }
  integration.labels = uniq(integration.labels.map(s => s.toLowerCase())).sort()

  // Keywords
  if (pkg.keywords) {
    integration.keywords.push(...pkg.keywords)
  }
  const specialKeyworkds = [
    ...integration.labels,
    'community',
    'official',
    '3rd-party',
    'external',
    'vue',
    'vuejs',
    'vue.js',
    'nuxt',
    'nuxt.js',
    'nuxtjs',
    'module',
    'script',
    'nuxt-module'
  ]
  integration.keywords = uniq(integration.keywords.map(s => s.toLowerCase()))
    .filter(k => !specialKeyworkds.includes(k))
    .sort()

  // Categories
  integration.categories = integration.categories.map(s => s.toLowerCase()).sort()
  if (!integration.categories.length) {
    console.warn('No categories for ' + integration.name)
  }

  // Auto name
  if (!integration.name) {
    integration.name = (pkg.name.startsWith('@') ?
      pkg.name.split('/')[1] : pkg.name)
      .replace('nuxt-', '')
      .replace('-module', '')
  }

  // Maintainers
  // TODO: Sync with maintainers.app
  if (!integration.maintainers.length) {
    const owner = integration.repo.split('/')[0]
    if (owner !== 'nuxt-community' && owner !== 'nuxt') {
      integration.maintainers.push({
        name: owner,
        github: owner
      })
    } else {
      console.warn('No maintainer for ' + integration.name)
    }
  }

  for (const maintainer of integration.maintainers) {
    if (maintainer.github && !maintainer.avatar) {
      maintainer.avatar = 'https://github.com/' + maintainer.github + '.png'
    }
  }

  // Default description
  if (!integration.description) {
    integration.description = pkg.description
  }

  // Write integration
  await writeIntegration(integration)

  return integration
}

export async function getIntegration(name) {
  let integration = {
    name: '',
    description: '',
    long_description: '',
    repo: '',
    npm: '',
    type: 'module',
    icon: '',
    github: '',
    website: '',
    learn_more: '',
    keywords: [],
    categories: [],
    labels: [],
    maintainers: [],
  }

  const file = resolve(integrationsDir, name + '.yml')
  if (existsSync(file)) {
    integration = defu(yml.load(await readFile(file, 'utf-8')), integration)
  }

  return integration
}

export async function writeIntegration(integration) {
  const file = resolve(integrationsDir, integration.name + '.yml')
  await writeFile(file, yml.dump(integration))
}

export async function readIntegrations() {
  const names = (await globby(join(integrationsDir, '*.yml'))).map(p => basename(p, extname(p)))

  // for (const name of names) {
  //   const p = resolve(integrationsDir, name + '.yml')
  //   const data = yml.load(await readFile(p, 'utf-8'))
  //   if (data.name !== name) {
  //     await remove(p)
  //   }
  // }

  return Promise.all(names.map(n => getIntegration(n)))
}

export async function syncAll() {
  const integrations = await readIntegrations()
  const updatedIntegrations = await Promise.all(integrations.map(integration => {
    return sync(integration.name, integration.repo)
  }))
  return updatedIntegrations
}

export async function build() {
  const integrations = await readIntegrations()
  await mkdirp(distDir)
  await writeFile(distFile, JSON.stringify(integrations, null, 2))
}
