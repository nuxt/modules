import config from '#config'
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
  if (config.githubToken) {
    const { $fetch } = await import('ohmyfetch')
    module.downloads = 0
    try {
      const body = await $fetch(`https://api.npmjs.org/downloads/point/last-month/${module.npm}`)
      module.downloads = body.downloads
    } catch (err) {
      console.error(`Could not fetch NPM stats for ${module.npm}`, err.message)
    }
    try {
      const [owner, repo] = module.repo.split('#')[0].split('/')
      const repoObj = await $fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
          Authorization: 'token ' + config.githubToken
        }
      })
      module.stars = repoObj.stargazers_count || 0
    } catch (err) {
      console.error(`Could not fetch GitHub stars for ${module.repo}`, err.message)
    }
  } else {
    module.downloads = rand(0, 500)
    module.stars = rand(0, 2000)
  }
  return module
}
