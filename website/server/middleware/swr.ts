export default (_req, res, next) => {
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate')
  next()
}
