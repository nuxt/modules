import { createError } from 'h3'
import { ModuleInfo } from '../../../../lib/types'
import { fetchModuleStats } from '../modules'

export default defineEventHandler(async (event) => {
  const modules = await import('../../../../npm/modules.json').then(r => r.default || r) as ModuleInfo[]
  const module = modules.find(m => m.name === event.context.params.name)

  if (!module) {
    throw createError({ statusCode: 404, statusMessage: 'Module not found' })
  }

  return await fetchModuleStats(module)
})
