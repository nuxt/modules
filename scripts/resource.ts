import { existsSync, readFile, writeFile, mkdirp } from 'fs-extra'
import { resolve, dirname, join } from 'path'
import * as yml from 'js-yaml'
import globby from 'globby'
import defu from 'defu'
import { resourcesDir, rootDir, fetchGithubPkg } from './utils'

export async function sync(repo) {
  let resource: ReturnType<typeof createResource>

  // Read resource
  const resourceFile = resolve(resourcesDir, repo + '.yml')
  if (existsSync(resourceFile)) {
    resource = createResource(await readResource(resourceFile))
  } else {
    resource = createResource({
      repo,
      github: 'https://github.com/' + repo,
      website: 'https://github.com/' + repo,
    })
  }

  // Fetch latest package.json from github
  const pkg = await fetchGithubPkg(repo)
  resource.npm = {
    name: pkg.name,
    description: pkg.description || '',
    license: pkg.license || ''
  }

  // Labels
  if (resource.repo.startsWith('nuxt-community/')) {
    resource.labels.push('community')
  }
  if (resource.repo.startsWith('nuxt/')) {
    resource.labels.push('core')
  }
  resource.labels = Array.from(new Set(resource.labels))

  // Auto name
  if (!resource.name) {
    resource.name = (resource.npm.name.startsWith('@') ?
      resource.npm.name.split('/')[1] : resource.npm.name)
      .replace('nuxt-', '')
      .replace('-module', '')
  }

  // Maintainers
  // TODO: Sync with maintainers.app
  for (const maintainer of resource.maintainers) {
    if (maintainer.github && !maintainer.avatar) {
      maintainer.avatar = 'https://github.com/' + maintainer.github + '.png'
    }
  }

  // Default description
  if (!resource.short_description) {
    resource.short_description = resource.npm.description
  }

  // Write resource
  await mkdirp(dirname(resourceFile))
  await writeResource(resourceFile, resource)

  return { resource, resourceFile }
}

export function createResource(rc) {
  const defaults = {
    name: '',
    short_description: '',
    long_description: '',
    license: '',
    repo: '',
    module: {},
    npm: {
      name: '',
      description: '',
      license: ''
    },
    labels: [],
    maintainers: [],
  }

  return defu<typeof defaults>(rc, defaults)
}

export async function readResource(resourceFile) {
  return yml.load(await readFile(resourceFile, 'utf-8'))
}

export async function writeResource(resourceFile, resource) {
  await writeFile(resourceFile, yml.dump(resource))
}

export async function readResources() {
  const resourceFiles = await globby(join(resourcesDir, '**/*.yml'))
  return Promise.all(resourceFiles.map(async resourceFile => ({
    resourceFile,
    resource: await readResource(resourceFile)
  })))
}

export async function syncAll() {
  const resources = await readResources()
  const updatedResources = await Promise.all(resources.map(({ resource }) => {
    return sync(resource.repo)
  }))
  return updatedResources
}

export async function dump() {
  const resources = (await readResources()).map(r => r.resource)
  const distDir = join(rootDir, 'dist')
  await mkdirp(distDir)
  await writeFile(resolve(distDir, 'resources.json'), JSON.stringify(resources, null, 2))
}
