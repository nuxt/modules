import {
  createIPX,
  createIPXMiddleware
} from 'ipx'

const CDN_URL = 'https://cdn.jsdelivr.net/gh/nuxt/modules@main/website/static/'

const ipx = createIPX({
  alias: {
    '/': ''
  },
  domains: [
    'https://cdn.jsdelivr.net',
    'avatars.githubusercontent.com',
    'avatars0.githubusercontent.com',
    'avatars1.githubusercontent.com',
    'avatars2.githubusercontent.com',
    'avatars3.githubusercontent.com'
  ]
})

const middleware = createIPXMiddleware(ipx)

export default (req, res) => {
  const [operations, ...parts] = req.url.split('/').splice(1)
  if (parts[0].startsWith('http')) {
    req.url = `/${operations}/${parts.join('/')}`
  } else {
    req.url = `/${operations}/${CDN_URL}${parts.join('/')}`
  }

  return middleware(req, res)
}
