import { resolve } from 'node:path'
import { ofetch } from 'ofetch'
import type { Packument } from '@npm/types'

export const rootDir = resolve(__dirname, '..')
export const modulesDir = resolve(rootDir, 'modules')
export const distDir = resolve(rootDir)
export const distFile = resolve(distDir, 'modules.json')

export const userAgent = 'sync-script for https://nuxt.com/modules'

export function fetchPKG(name: string) {
  return ofetch<Packument>('https://registry.npmjs.org/' + name, {
    responseType: 'json',
    headers: {
      'user-agent': userAgent,
    },
  })
}

export function fetchRawGithub(path: string) {
  return ofetch('https://raw.githubusercontent.com/' + path, {
    responseType: 'json',
    headers: {
      'user-agent': userAgent,
    },
  })
}

export function fetchGithubPkg(repo: string) {
  let path: string
  // HEAD will be the default branch
  [repo, path = 'HEAD'] = repo.split('#') as [string, string?]

  return fetchRawGithub(repo + '/' + path + '/' + 'package.json')
}

export async function fetchModuleJson(npmPackage: string, version: string) {
  try {
    return await ofetch(`https://unpkg.com/${npmPackage}@${version}/dist/module.json`, {
      responseType: 'json',
    })
  }
  catch {
    return null
  }
}

export function uniq<T>(items: T[]) {
  return Array.from(new Set(items))
}
