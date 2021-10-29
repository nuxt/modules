export default (req, res, next) => {
  if (req.method.toUpperCase() !== 'GET') {
    return next()
  }
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate')
  next()
}
