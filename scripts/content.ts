
import { Octokit } from '@octokit/rest'
import got from 'got'

const rand = (min, max) => min + Math.round((Math.random() * (max - min)))

export default function () {
  const { nuxt } = this
  
  nuxt.hook('content:file:beforeInsert', async (module) => {
    if (process.env.GITHUB_TOKEN) {
      const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
      module['downloads'] = 0
      try {
        const body = await got(`https://api.npmjs.org/downloads/point/last-month/${module.npm}`).json()
        module['downloads'] = body['downloads']
      } catch (err) {
        console.error(`Could not fetch NPM stats for ${module.npm}`, err.message)
      }
      try {
        const [owner, repo] = module.repo.split('#')[0].split('/')
        const { data } = await octokit.repos.get({ owner, repo })
        module['stars'] = data.stargazers_count || 0
      } catch (err) {
        console.error(`Could not fetch GitHub stars for ${module.repo}`, err.message)
      }
    } else {
      module['downloads'] = rand(0, 500)
      module['stars'] = rand(0, 2000)
    }
  })
}