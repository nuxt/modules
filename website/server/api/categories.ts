
const modulesCDN = 'https://cdn.jsdelivr.net/gh/nuxt/modules@main/lib/categories.json'

export default async () => {
  const categories = await $fetch(modulesCDN) as any[]
  return {
    categories
  }
}
