import { resolve } from 'node:path'
import { ofetch } from 'ofetch'

export const rootDir = resolve(__dirname, '..')
export const modulesDir = resolve(rootDir, 'modules')
export const distDir = resolve(rootDir)
export const distFile = resolve(distDir, 'modules.json')

export function fetchPKG(name) {
  return ofetch('http://registry.npmjs.org/' + name)
}

export function fetchRawGithub(path) {
  return ofetch('https://raw.githubusercontent.com/' + path, { responseType: 'json' })
}

export function fetchGithubPkg(repo) {
  let path: string
  // HEAD will be the default branch
  [repo, path = 'HEAD'] = repo.split('#')

  return fetchRawGithub(repo + '/' + path + '/' + 'package.json')
}

export function uniq<T>(items: T[]) {
  return Array.from(new Set(items))
}
