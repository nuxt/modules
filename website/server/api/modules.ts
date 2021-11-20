import { ModuleInfo } from '../../../lib/types'

export default async () => {
  const _modules = await import('../../../npm/modules.json').then(r => r.default || r) as ModuleInfo[]
  const modules = await Promise.all(_modules.map(module => fetchModuleStats(module)))
  return {
    modules
  }
}

function rand (min: number, max: number) {
  return min + Math.round((Math.random() * (max - min)))
}

async function fetchModuleStats (module: ModuleInfo) {
  if (process.env.NODE_ENV === 'production' || process.env.USE_NUXT_API) {
    const [npm, github] = await Promise.all([
      $fetch<any>(`https://api.nuxtjs.org/api/npm/package/${module.npm}`)
        .catch(() => ({ downloads: { lastMonth: 0 } })),
      $fetch<any>(`https://api.nuxtjs.org/api/github/repo/${module.repo.split('#')[0]}`)
        .catch(() => ({ stars: 0 }))
    ])
    module.downloads = npm.downloads.lastMonth
    module.stars = github.stars
    module.publishedAt = +new Date(npm.publishedAt || undefined)
    module.createdAt = +new Date(npm.createdAt || undefined)
  } else {
    module.downloads = rand(0, 500)
    module.stars = rand(0, 2000)
    module.publishedAt = rand(1_600_000_000_000, 1_630_000_000_000)
    module.createdAt = rand(1_600_000_000_000, 1_630_000_000_000)
  }
  return module
}
