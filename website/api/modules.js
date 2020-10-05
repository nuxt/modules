const nuxtModules = require('@nuxt/modules');
const got = require('got')

module.exports = async (req, res) => {
  console.log('Fetching stats...')
  await Promise.all(nuxtModules.map(async (module) => {
    if (module.type !== 'module') return
    module.downloads = 0
    try {
      const body = await got(`https://api.npmjs.org/downloads/point/last-month/${module.npm}`).json()
      module.downloads = body.downloads
    } catch (err) {
      console.error(`Could not fetch stats for ${module.npm}`, err.message)
    }
  }))
  console.log('Stats fetched')

  res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400')
  res.json(nuxtModules)
}