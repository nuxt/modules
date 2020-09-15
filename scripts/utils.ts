import axios from 'axios'

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
