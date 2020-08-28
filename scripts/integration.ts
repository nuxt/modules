import { existsSync, readFile, writeFile, mkdirp } from 'fs-extra'
import { resolve, dirname, join } from 'path'
import * as yml from 'js-yaml'
import globby from 'globby'
import defu from 'defu'
import { integrationsDir, rootDir, fetchGithubPkg } from './utils'

export async function sync(repo) {
  let integration: ReturnType<typeof createIntegration>

  // Read integration
  const integrationFile = resolve(integrationsDir, repo + '.yml')
  if (existsSync(integrationFile)) {
    integration = createIntegration(await readIntegration(integrationFile))
  } else {
    integration = createIntegration({
      repo,
      github: 'https://github.com/' + repo,
      website: 'https://github.com/' + repo,
    })
  }

  // Fetch latest package.json from github
  const pkg = await fetchGithubPkg(repo)
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
    const specialKeyworkds = ['community', 'official', 'external']
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
  await mkdirp(dirname(integrationFile))
  await writeIntegration(integrationFile, integration)

  return { integration, integrationFile }
}

export function createIntegration(rc) {
  const defaults = {
    name: '',
    description: '',
    long_description: '',
    repo: '',
    npm: '',
    keywords: [],
    categories: [],
    maintainers: [],
  }

  return defu<typeof defaults>(rc, defaults)
}

export async function readIntegration(integrationFile) {
  return yml.load(await readFile(integrationFile, 'utf-8'))
}

export async function writeIntegration(integrationFile, integration) {
  await writeFile(integrationFile, yml.dump(integration))
}

export async function readIntegrations() {
  const integrationFiles = await globby(join(integrationsDir, '**/*.yml'))
  return Promise.all(integrationFiles.map(async integrationFile => ({
    integrationFile,
    integration: await readIntegration(integrationFile)
  })))
}

export async function syncAll() {
  const integrations = await readIntegrations()
  const updatedIntegrations = await Promise.all(integrations.map(({ integration }) => {
    return sync(integration.repo)
  }))
  return updatedIntegrations
}

export async function dump() {
  const integrations = (await readIntegrations()).map(r => r.integration)
  const distDir = join(rootDir, 'dist')
  await mkdirp(distDir)
  await writeFile(resolve(distDir, 'integrations.json'), JSON.stringify(integrations, null, 2))
}
