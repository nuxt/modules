import axios from 'axios'
import { resolve } from 'path'

export const rootDir = resolve(__dirname, '..')
export const resourcesDir = resolve(rootDir, 'resources')

export async function fetchPKG(name) {
  return axios.get('http://registry.npmjs.org/' + name).then(r => r.data)
}

export async function fetchRawGithub(path) {
  return axios.get('https://raw.githubusercontent.com/' + path).then(r => r.data)
}

export async function fetchGithubPkg(repo, branch = 'master') {
  return fetchRawGithub(repo + '/' + branch + '/' + 'package.json')
}
