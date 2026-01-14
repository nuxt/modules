import * as p from '@clack/prompts'
import { sync, syncAll, build } from './modules'
import { version } from './version'

async function main() {
  const [command, ...args] = process.argv.splice(2)

  switch (command) {
    case 'sync':
      await runSync(args)
      break
    case 'build':
      await runBuild()
      break
    case 'version':
      await version()
      break
    default:
      p.log.error(`Unknown command: ${command}`)
      process.exit(1)
  }
}

async function runSync(args: string[]) {
  const [name, repo] = args

  if (name) {
    await runSingleSync(name, repo)
  }
  else {
    await runSyncAll()
  }
}

async function runSingleSync(name: string, repo?: string) {
  p.intro('Nuxt Modules Sync')

  const s = p.spinner()
  const displayName = name === '-' ? repo : name
  s.start(`Syncing ${displayName}`)

  try {
    const { module, regressions } = await sync(name, repo, true)
    s.stop(`Synced ${module.name}`)

    let hasIssues = false

    if (regressions.length > 0) {
      hasIssues = true
      p.log.warn(`Regressions detected (${regressions.length}):`)
      for (const r of regressions) {
        p.log.message(`  [${r.type}] ${r.description}`)
      }
    }

    if (module.archived) {
      hasIssues = true
      p.log.error(`Repository is archived`)
    }

    if (hasIssues) {
      p.outro('Sync completed with issues')
      process.exit(1)
    }
    else {
      p.outro('Sync completed successfully')
    }
  }
  catch (err) {
    s.stop('Sync failed')
    p.log.error(err instanceof Error ? err.message : String(err))
    p.outro('Sync failed')
    process.exit(1)
  }
}

async function runSyncAll() {
  p.intro('Nuxt Modules Sync')

  const progress = p.progress({ max: 100 })
  progress.start('Starting sync...')

  let lastPercent = 0
  const result = await syncAll((current, total, moduleName) => {
    const percent = Math.round((current / total) * 100)
    const delta = percent - lastPercent
    if (delta > 0) {
      progress.advance(delta, `Syncing ${moduleName} (${current}/${total})`)
      lastPercent = percent
    }
  })

  progress.stop(`Synced ${result.synced.length}/${result.total} modules`)

  const hasErrors = result.errors.length > 0
  const hasRegressions = result.regressions.length > 0
  const hasArchived = result.archivedModules.length > 0
  const hasIssues = hasErrors || hasRegressions || hasArchived

  if (hasIssues) {
    p.log.message('') // spacing
  }

  if (hasErrors) {
    p.log.error(`Failed to sync ${result.errors.length} module(s):`)
    for (const { moduleName, error } of result.errors) {
      p.log.message(`  ${moduleName}: ${error.message}`)
    }
  }

  if (hasRegressions) {
    p.log.warn(`Regressions detected (${result.regressions.length}):`)
    for (const r of result.regressions) {
      p.log.message(`  [${r.type}] ${r.moduleName}: ${r.description}`)
    }
  }

  if (hasArchived) {
    p.log.warn(`Archived repositories (${result.archivedModules.length}):`)
    for (const name of result.archivedModules) {
      p.log.message(`  ${name}`)
    }
  }

  if (hasIssues) {
    p.outro('Sync completed with issues')
    process.exit(1)
  }
  else {
    p.outro('Sync completed successfully')
  }
}

async function runBuild() {
  p.intro('Nuxt Modules Build')

  const s = p.spinner()
  s.start('Building modules...')

  try {
    await build()
    s.stop('Build complete')
    p.outro('Build completed successfully')
  }
  catch (err) {
    s.stop('Build failed')
    p.log.error(err instanceof Error ? err.message : String(err))
    p.outro('Build failed')
    process.exit(1)
  }
}

main().catch((err) => {
  p.log.error(err instanceof Error ? err.message : String(err))
  process.exit(1)
})
