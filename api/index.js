const nuxtModules = require('../dist/modules')
const { Octokit } = require('@octokit/rest')
const got = require('got')

module.exports = async (req, res) => {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
  await Promise.all(nuxtModules.map(async (module) => {
    if (module.type !== 'module') return
    module.downloads = 0
    try {
      const body = await got(`https://api.npmjs.org/downloads/point/last-month/${module.npm}`).json()
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
  }))
  console.log('Stats fetched')

  res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400')
  res.json(nuxtModules)
}