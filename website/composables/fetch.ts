import { ModuleInfo } from '~/../lib/types'
import { categories } from '~/../lib/categories'

export async function fetchModules () {
  const { modules } = await $fetch('/api/modules') as { modules: ModuleInfo[]}

  const maintainers = []
  let downloadsTotal = 0
  modules.forEach((module) => {
    downloadsTotal += (module.downloads || 0)
    module.maintainers.forEach((maintainer) => {
      if (!maintainers.find(m => m.name === maintainer.name)) {
        maintainers.push(maintainer)
      }
    })
  })

  for (const module of modules) {
    // Extract compatibility tags
    // TOOD: Improve with semver checker
    const compatibilityTags = []
    if (module.compatibility.nuxt.includes('^2.0.0')) {
      if (module.compatibility.requires.bridge !== true /* bridge: false or bridge: optional */) {
        compatibilityTags.push('2.x')
      }
      if (module.compatibility.requires.bridge) {
        compatibilityTags.push('2.x-bridge')
      }
    }
    if (module.compatibility.nuxt.includes('^3.0.0')) {
      compatibilityTags.push('3.x')
    }

    module.tags = [
      ...(module.tags || []),
      ...compatibilityTags
    ] as string[]
  }

  return {
    modules,
    categories,
    maintainersTotal: maintainers.length,
    downloadsTotal
  }
}

export type ModulesData = ReturnType<typeof fetchModules> extends Promise<infer R> ? R : never
