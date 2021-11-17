import { ModuleInfo } from '../../types'

export async function fetchModules () {
  const { modules } = await $fetch('/api/modules') as { modules: ModuleInfo[]}
  const { categories } = await $fetch('/api/categories')

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
    module.tags = [
      ...(module.tags || []),
      ...Object.entries(module.compatibility)
        .map(([version, status]) => status === 'working' ? version : false)
        .filter(Boolean)
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
