const modulesCDN = 'https://cdn.jsdelivr.net/npm/@nuxt/modules@latest/dist/modules.json'

export default async () => {
  const _modules = await $fetch(modulesCDN) as any[]
  const modules = await Promise.all(_modules.map(module => fetchModuleStats(module)))
  return {
    modules
  }
}

function rand (min, max) {
  return min + Math.round((Math.random() * (max - min)))
}

async function fetchModuleStats (module) {
  if (process.env.NODE_ENV === 'production' || process.env.USE_NUXT_API) {
    const [npm, github] = await Promise.all([
      $fetch<any>(`https://api.nuxtjs.org/api/npm/package/${module.npm}`)
        .catch(() => ({ downloads: { lastMonth: 0 } })),
      $fetch<any>(`https://api.nuxtjs.org/api/github/repo/${module.repo.split('#')[0]}`)
        .catch(() => ({ stars: 0 }))
    ])
    module.downloads = npm.downloads.lastMonth
    module.stars = github.stars
  } else {
    module.downloads = rand(0, 500)
    module.stars = rand(0, 2000)
  }
  return module
}
