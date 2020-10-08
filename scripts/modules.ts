import { existsSync, readFile, readJson, writeFile, mkdirp } from 'fs-extra'
import { resolve, join, basename, extname } from 'path'
import * as yml from 'js-yaml'
import globby from 'globby'
import defu from 'defu'
import { fetchGithubPkg, modulesDir, distDir, distFile  } from './utils'

export async function sync(name, repo?: string) {
  const module = await getModule(name)
  const categories = await readJson(join(__dirname, '..', 'modules', '_categories.json'))

  // Repo
  if (repo) {
    module.repo = repo
  }

  if (!module.repo) {
    throw new Error(`repo not provided for ${name}`)
  }

  // Defaults
  if (!module.repo) {
    module.repo = repo
  }
  if (!module.github) {
    module.github = `https://github.com/${module.repo.replace('#', '/tree/')}`
  }
  if (!module.website) {
    module.website = module.github
  }

  // Fetch latest package.json from github
  const pkg = await fetchGithubPkg(module.repo)
  module.npm = pkg.name

  // Labels
  if (module.repo.startsWith('nuxt-community/')) {
    module.label = 'community'
  } else if (module.repo.startsWith('nuxt/')) {
    module.label = 'official'
  } else {
    module.label = '3rd-party'
  }

  // Categories
  if (!module.category) {
    console.warn(`No category for ${module.name}`)
  } else if (!categories.includes(module.category)) {
    console.warn(`Wrong category ${module.category} for ${module.name}`)
    module.category = ''
  }

  // Auto name
  if (!module.name) {
    module.name = (pkg.name.startsWith('@') ?
      pkg.name.split('/')[1] : pkg.name)
      .replace('nuxt-', '')
      .replace('-module', '')
  }

  // Maintainers
  // TODO: Sync with maintainers.app
  if (!module.maintainers.length) {
    const owner = module.repo.split('/')[0]
    if (owner !== 'nuxt-community' && owner !== 'nuxt') {
      module.maintainers.push({
        name: owner,
        github: owner
      })
    } else {
      console.warn(`No maintainer for ${module.name}`)
    }
  }

  for (const maintainer of module.maintainers) {
    if (maintainer.github && !maintainer.avatar) {
      maintainer.avatar = `https://github.com/${maintainer.github}.png`
    }
  }

  // Default description
  if (!module.description) {
    module.description = pkg.description
  }

  // Write module
  await writeModule(module)

  return module
}

export async function getModule(name) {
  let module = {
    name: '',
    description: '',
    repo: '', // nuxt/example
    npm: '', // @nuxt/core
    icon: '', // url or filename from /static/icons
    github: '', // github link
    website: '',
    learn_more: '',
    category: '', // see modules/_categories.json
    label: '', // official, community, 3rd-party
    maintainers: [],
  }

  const file = resolve(modulesDir, name + '.yml')
  if (existsSync(file)) {
    module = defu(yml.load(await readFile(file, 'utf-8')), module)
  }

  return module
}

export async function writeModule(module) {
  const file = resolve(modulesDir, `${module.name}.yml`)
  await writeFile(file, yml.dump(module))
}

export async function readModules() {
  const names = (await globby(join(modulesDir, '*.yml'))).map(p => basename(p, extname(p)))

  return Promise.all(names.map(n => getModule(n)))
}

export async function syncAll() {
  const modules = await readModules()
  const updatedModules = await Promise.all(modules.map(module => {
    return sync(module.name, module.repo)
  }))
  return updatedModules
}

export async function build() {
  const modules = await readModules()
  await mkdirp(distDir)
  await writeFile(distFile, JSON.stringify(modules, null, 2))
}
