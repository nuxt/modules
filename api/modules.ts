import { Octokit } from '@octokit/rest'
import got from 'got'
import { readModules } from '../scripts/modules'

const handler = async (req, res) => {
  const nuxtModules = await readModules()

 

  res.setHeader('Cache-Control', 'max-age=0, s-maxage=600')
  res.end(JSON.stringify(nuxtModules, null, 2))
}
