import { Octokit } from '@octokit/rest'
import got from 'got'
import { readModules } from '../scripts/modules'

const rand = (min, max) => min + Math.round((Math.random() * (max - min)))

const handler = async (req, res) => {
  const nuxtModules = await readModules()

  if (process.env.GITHUB_TOKEN) {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
    await Promise.all(nuxtModules.map(async (module) => {
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
    }))
  } else {
    for (const module of nuxtModules) {
      module['downloads'] = rand(0, 500)
      module['stars'] = rand(0, 2000)
    }
  }

  res.setHeader('Cache-Control', 'max-age=0, s-maxage=600')
  res.end(JSON.stringify(nuxtModules, null, 2))
}

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

module.exports = allowCors(handler)