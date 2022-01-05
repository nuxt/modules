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
  const ghRepo = module.repo.split('#')[0]
  if (process.env.NODE_ENV === 'production' || process.env.USE_NUXT_API) {
    const [npm, github, contributors] = await Promise.all([
      $fetch<any>(`https://api.nuxtjs.org/api/npm/package/${module.npm}`)
        .catch((err) => {
          console.error(`Cannot fetch npm info for ${module.npm}: ${err}`)
          return { downloads: { lastMonth: 0 } }
        }),
      $fetch<any>(`https://api.nuxtjs.org/api/github/repo/${ghRepo}`)
        .catch((err) => {
          console.error(`Cannot fetch github repo info for ${ghRepo}: ${err}`)
          return { stars: 0 }
        }),
      $fetch<any>(`https://api.nuxtjs.org/api/github/contributors/${ghRepo}`)
        .catch((err) => {
          console.error(`Cannot fetch github contributors info for ${ghRepo}: ${err}`)
          return []
        })
    ])
    module.downloads = npm.downloads.lastMonth
    module.stars = github.stars
    module.publishedAt = +new Date(npm.publishedAt || undefined)
    module.createdAt = +new Date(npm.createdAt || undefined)
    module.contributors = contributors
  } else {
    module.downloads = rand(0, 500)
    module.stars = rand(0, 2000)
    module.publishedAt = rand(1_600_000_000_000, 1_630_000_000_000)
    module.createdAt = rand(1_600_000_000_000, 1_630_000_000_000)
    module.contributors = [
      { login: 'nuxt' },
      { login: 'vuejs' },
      { login: 'unjs' }
    ]

    // Uncoment for real stats
    // module.contributors = await $fetch<any>(`https://api.nuxtjs.org/api/github/contributors/${ghRepo}`)
  }
  return module
}
