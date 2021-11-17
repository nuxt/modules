export interface MaintainerInfo {
  name: string
  github: string
  twitter?: string
}

export type CompatibilityStatus = 'working' | 'wip' | 'unknown' | 'not-working'

export interface ModuleInfo {
  name: string
  description:string
  repo: string
  npm: string
  icon?: string
  github: string
  website:string
  learn_more:string
  category: string
  type: 'community' | 'official' | '3rd-party'
  maintainers: MaintainerInfo[]
  compatibility: {
    '2.x': CompatibilityStatus
    '2.x-bridge': CompatibilityStatus
    '3.x': CompatibilityStatus
  }
  // externals
  downloads?: number
  tags?: string[]
}
