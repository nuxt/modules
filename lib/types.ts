import type { categories } from './categories.ts'

// TODO: Move to @nuxt/kit
// TODO: Support version matrix
export interface ModuleCompatibility {
  nuxt: string
  devtools?: string
  versionMap?: {
    [nuxtVersion: string]: string
  }
  requires: { bridge?: boolean | 'optional' }
}

export interface MaintainerInfo {
  name: string
  github: string
  twitter?: string
  bluesky?: string
}

export interface GithubContributor {
  username: string
  name?: string
  avatar_url?: string
}

export type CompatibilityStatus = 'working' | 'wip' | 'unknown' | 'not-working'
export type ModuleType = 'community' | 'official' | '3rd-party'

export interface ModuleInfo {
  name: string
  description: string
  repo: string
  npm: string
  icon?: string
  github: string
  website: string
  learn_more: string
  category: (typeof categories)[number]
  type: ModuleType
  maintainers: MaintainerInfo[]
  contributors?: GithubContributor[]
  compatibility: ModuleCompatibility
  aliases?: string[]
  archived?: boolean

  // Fetched in realtime API for modules.nuxt.org
  downloads?: number
  tags?: string[]
  stars?: number
  publishedAt?: number
  createdAt?: number
}

export interface SyncRegression {
  type: 'docs-url' | 'compatibility'
  moduleName: string
  repo: string
  currentValue: string
  moduleValue: string
  description: string
}

export interface SyncResult {
  module: ModuleInfo
  regressions: SyncRegression[]
}

export interface SyncError {
  moduleName: string
  error: Error
}

export interface SyncAllResult {
  total: number
  synced: string[]
  errors: SyncError[]
  regressions: SyncRegression[]
  archivedModules: string[]
}

export type SyncProgressCallback = (current: number, total: number, moduleName: string) => void
