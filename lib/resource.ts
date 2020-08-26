import { existsSync, readFile, writeFile, mkdirp } from 'fs-extra'
import { resolve, dirname, join } from 'path'
import * as yml from 'js-yaml'
import globby from 'globby'
import { resourcesDir, rootDir, fetchGithubPkg } from './utils'

export async function sync(repo) {
  let resource = {
    repo,
    github: 'https://github.com/' + repo,
    description: '',
    license: '',
    module: {}
  }

  // Read resoure file
  const resourceFile = resolve(resourcesDir, repo + '.yml')
  await mkdirp(dirname(resourceFile))

  if (existsSync(resourceFile)) {
    Object.assign(resource, await readResource(resourceFile))
  }

  // Fetch latest package.json from github
  const pkg = await fetchGithubPkg(repo)
  Object.assign(resource, {
    npm_name: pkg.name,
    description: pkg.description,
    license: pkg.license
  })

  // Write resource
  await writeResource(resourceFile, resource)

  return { resource, resourceFile }
}

export async function readResource(resourceFile) {
  return yml.load(await readFile(resourceFile, 'utf-8'))
}

export async function writeResource(resourceFile, resource) {
  await writeFile(resourceFile, yml.dump(resource))
}

export async function readRerosources() {
  const resourceFiles = await globby(join(resourcesDir, '**/*.yml'))
  return Promise.all(resourceFiles.map(async resourceFile => ({
    resourceFile,
    resource: await readResource(resourceFile)
  })))
}

export async function syncAll() {
  const resources = await readRerosources()
  const updatedResources = await Promise.all(resources.map(({ resource }) => {
    return sync(resource.repo)
  }))
  return updatedResources
}

export async function dump() {
  const resources = (await readRerosources()).map(r => r.resource)
  const distDir = join(rootDir, 'dist')
  await mkdirp(distDir)
  await writeFile(resolve(distDir, 'resources.json'), JSON.stringify(resources, null, 2))
}
