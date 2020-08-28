import axios from 'axios'

export async function fetchPKG(name) {
  return axios.get('http://registry.npmjs.org/' + name).then(r => r.data)
}

export async function fetchRawGithub(path) {
  return axios.get('https://raw.githubusercontent.com/' + path).then(r => r.data)
}

export async function fetchGithubPkg(repo, branch = 'master') {
  if (repo.includes('#')) {
    [repo, branch] = repo.split('#')
  }
  return fetchRawGithub(repo + '/' + branch + '/' + 'package.json')
}
