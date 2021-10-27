import { resolve } from 'path'
import axios from 'axios'
export const rootDir = resolve(__dirname, '..')
export const modulesDir = resolve(rootDir, 'modules')
export const distDir = resolve(rootDir, 'dist')
export const distFile = resolve(distDir, 'modules.json')

export function fetchPKG (name) {
  return axios.get('http://registry.npmjs.org/' + name).then(r => r.data)
}

export function fetchRawGithub (path) {
  return axios.get('https://raw.githubusercontent.com/' + path).then(r => r.data)
}

export function fetchGithubPkg (repo) {
  let path
  [repo, path = 'master'] = repo.split('#')

  return fetchRawGithub(repo + '/' + path + '/' + 'package.json')
}

export function uniq (items: any[]) {
  return Array.from(new Set(items))
}
