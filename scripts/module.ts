import { existsSync, readFile, writeFile, remove, mkdirp } from 'fs-extra'
import { resolve, join, basename, extname } from 'path'
import * as yml from 'js-yaml'
import globby from 'globby'
import defu from 'defu'
import { fetchGithubPkg, uniq, modulesDir, rootDir, distDir, distFile  } from './utils'

export async function sync(name, repo?: string) {
  const module = await getModule(name)

  // Repo
  if (repo) {
    module.repo = repo
  }

  if (!module.repo) {
    throw new Error('repo not provided for ' + name)
  }

  // Defaults
  if (!module.repo) {
    module.repo = repo
  }
  if (!module.github) {
    module.github = 'https://github.com/' + module.repo.replace('#', '/tree/')
  }
  if (!module.website) {
    module.website = module.github
  }

  // Fetch latest package.json from github
  const pkg = await fetchGithubPkg(module.repo)
  module.npm = pkg.name

  // Labels
  if (module.repo.startsWith('nuxt-community/')) {
    module.labels.push('community')
  } else if (module.repo.startsWith('nuxt/')) {
    module.labels.push('official')
  } else {
    module.labels.push('3rd-party')
  }
  module.labels = uniq(module.labels.map(s => s.toLowerCase())).sort()

  // Keywords
  if (pkg.keywords) {
    module.keywords.push(...pkg.keywords)
  }
  const specialKeyworkds = [
    ...module.labels,
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
  module.keywords = uniq(module.keywords.map(s => s.toLowerCase()))
    .filter(k => !specialKeyworkds.includes(k))
    .sort()

  // Categories
  module.categories = module.categories.map(s => s.toLowerCase()).sort()
  if (!module.categories.length) {
    console.warn('No categories for ' + module.name)
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
      console.warn('No maintainer for ' + module.name)
    }
  }

  for (const maintainer of module.maintainers) {
    if (maintainer.github && !maintainer.avatar) {
      maintainer.avatar = 'https://github.com/' + maintainer.github + '.png'
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

  const file = resolve(modulesDir, name + '.yml')
  if (existsSync(file)) {
    module = defu(yml.load(await readFile(file, 'utf-8')), module)
  }

  return module
}

export async function writeModule(module) {
  const file = resolve(modulesDir, module.name + '.yml')
  await writeFile(file, yml.dump(module))
}

export async function readModules() {
  const names = (await globby(join(modulesDir, '*.yml'))).map(p => basename(p, extname(p)))

  // for (const name of names) {
  //   const p = resolve(modulesDir, name + '.yml')
  //   const data = yml.load(await readFile(p, 'utf-8'))
  //   if (data.name !== name) {
  //     await remove(p)
  //   }
  // }

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
