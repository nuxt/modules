
export default async () => {
  const categories = await import('../../../npm/categories.json').then(r => r.default || r)
  return {
    categories
  }
}
