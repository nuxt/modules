export default function (_ctx, inject) {
  inject('modules', {
    async getModules () {
      const modules = await getModules()
      modules.sort((a: any, b: any) => { return b.downloads - a.downloads })
      return modules
    },
    getCategories () {
      return import('../../lib/categories.json').then(r => r.default)
    }
  })
}

function rand (min, max) {
  return min + Math.round((Math.random() * (max - min)))
}

let _rawModules
async function getRawModules () {
  return _rawModules || (_rawModules = await import('../../dist/modules.json').then(r => r.default))
}

let _modules
async function getModules () {
  if (!_modules) {
    const rawModules = await getRawModules()
    _modules = await Promise.all(rawModules.map(module => fetchModuleStats(module)))
  }
  return _modules
}

async function fetchModuleStats (module) {
  if (process.env.GITHUB_TOKEN) {
    const { Octokit } = await import('@octokit/rest')
    const { $fetch } = await import('ohmyfetch')
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
    module.downloads = 0
    try {
      const body = await $fetch(`https://api.npmjs.org/downloads/point/last-month/${module.npm}`)
      module.downloads = body.downloads
    } catch (err) {
      console.error(`Could not fetch NPM stats for ${module.npm}`, err.message)
    }
    try {
      const [owner, repo] = module.repo.split('#')[0].split('/')
      const { data } = await octokit.repos.get({ owner, repo })
      module.stars = data.stargazers_count || 0
    } catch (err) {
      console.error(`Could not fetch GitHub stars for ${module.repo}`, err.message)
    }
  } else {
    module.downloads = rand(0, 500)
    module.stars = rand(0, 2000)
  }
  return module
}
