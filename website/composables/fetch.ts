import { ModuleInfo } from '~/../lib/types'
import { categories } from '~/../lib/categories'

export async function fetchModules () {
  const { modules } = await $fetch('/api/modules') as { modules: ModuleInfo[]}

  for (const module of modules) {
    // Extract compatibility tags
    // TODO: Improve with semver checker
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

  // Unique contributors
  const contributors = new Set(modules.flatMap(m => m.contributors.map(m => m.login)))

  return {
    modules,
    categories,
    stats: {
      downloads: modules.reduce((sum, m) => sum + m.downloads, 0),
      contributors: contributors.size,
      modules: modules.length
    }
  }
}

export type ModulesData = ReturnType<typeof fetchModules> extends Promise<infer R> ? R : never
