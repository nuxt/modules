import { existsSync, readFile, writeFile, remove, mkdirp } from 'fs-extra'
import { resolve, join, basename, extname } from 'path'
import * as yml from 'js-yaml'
import globby from 'globby'
import defu from 'defu'
import {fetchGithubPkg } from './utils'

export const rootDir = resolve(__dirname, '..')
export const integrationsDir = resolve(rootDir, 'integrations')

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
    integration.github = 'https://github.com/' + integration.repo
  }
  if (!integration.website) {
    integration.website = integration.github
  }

  // Fetch latest package.json from github
  const pkg = await fetchGithubPkg(integration.repo)
  integration.npm = pkg.name

  // Keywords
  if (integration.repo.startsWith('nuxt-community/')) {
    integration.keywords.push('community')
  } else if (integration.repo.startsWith('nuxt/')) {
    integration.keywords.push('official')
  } else {
    integration.keywords.push('external')
  }
  if (pkg.keywords) {
    const specialKeyworkds = ['community', 'official', 'external', 'nuxt', 'module', 'script', 'nuxt-module']
    integration.keywords.push(...pkg.keywords.filter(k => !specialKeyworkds.includes(k)))
  }

  // Make keywords are unique and sorted
  integration.keywords = Array.from(new Set(integration.keywords)).sort()

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
    github: '',
    website: '',
    keywords: [],
    categories: [],
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

export async function dump() {
  const integrations = await readIntegrations()
  const distDir = join(rootDir, 'dist')
  await mkdirp(distDir)
  await writeFile(resolve(distDir, 'integrations.json'), JSON.stringify(integrations, null, 2))
}
