import { resolve } from 'path'
import { $fetch } from 'ohmyfetch'
export const rootDir = resolve(__dirname, '..')
export const modulesDir = resolve(rootDir, 'modules')
export const distDir = resolve(rootDir, 'dist')
export const distFile = resolve(distDir, 'modules.json')

export function fetchPKG (name) {
  return $fetch('http://registry.npmjs.org/' + name)
}

export function fetchRawGithub (path) {
  return $fetch('https://raw.githubusercontent.com/' + path)
}

export function fetchGithubPkg (repo) {
  let path
  [repo, path = 'master'] = repo.split('#')

  return fetchRawGithub(repo + '/' + path + '/' + 'package.json')
}

export function uniq (items: any[]) {
  return Array.from(new Set(items))
}
