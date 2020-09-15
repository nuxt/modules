import axios from 'axios'
import { resolve } from 'path'

export const rootDir = resolve(__dirname, '..')
export const integrationsDir = resolve(rootDir, 'integrations')
export const distDir = resolve(rootDir, 'dist')
export const distFile = resolve(distDir, 'integrations.json')

export async function fetchPKG(name) {
  return axios.get('http://registry.npmjs.org/' + name).then(r => r.data)
}

export async function fetchRawGithub(path) {
  return axios.get('https://raw.githubusercontent.com/' + path).then(r => r.data)
}

export async function fetchGithubPkg(repo) {
  let path
  [repo, path = 'master'] = repo.split('#')

  return fetchRawGithub(repo + '/' + path + '/' + 'package.json')
}

export function uniq(items: any[]) {
  return Array.from(new Set(items))
}
