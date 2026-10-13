import * as p from '@clack/prompts'
import c from 'picocolors'
import { sync, syncAll, build } from './modules.ts'
import { getChangedModuleNames } from './utils.ts'
import { version } from './version.ts'

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
      p.log.error(`Unknown command: ${c.bold(command)}`)
      process.exit(1)
  }
}

async function runSync(args: string[]) {
  const failOnArchived = args.includes('--fail-on-archived')
  const base = args.find(arg => arg.startsWith('--changed='))?.slice('--changed='.length)
  const [name, repo] = args.filter(arg => !arg.startsWith('--'))

  if (name) {
    await runSingleSync(name, repo, failOnArchived)
  }
  else {
    await runSyncAll(failOnArchived, base)
  }
}

async function runSingleSync(name: string, repo?: string, failOnArchived: boolean = false) {
  p.intro(c.bgCyan(c.black(' Nuxt Modules Sync ')))

  const s = p.spinner()
  const displayName = name === '-' ? repo : name
  s.start(`Syncing ${c.cyan(displayName)}`)

  try {
    const { module, regressions, warnings } = await sync(name, repo, true)
    s.stop(`Synced ${c.green(module.name)}`)

    let hasIssues = false

    if (warnings.length > 0) {
      p.log.warn(c.yellow(`Warnings (${c.bold(warnings.length)})`))
      for (const message of warnings) {
        p.log.message(c.dim(message))
      }
    }

    if (regressions.length > 0) {
      hasIssues = true
      p.log.warn(c.yellow(`Regressions detected (${c.bold(regressions.length)})`))
      for (const r of regressions) {
        p.log.message(`  ${c.dim('[')}${c.yellow(r.type)}${c.dim(']')} ${r.description}`)
      }
    }

    if (module.archived) {
      hasIssues ||= failOnArchived
      p.log.error(c.red(`Repository is ${c.bold('archived')}`))
    }

    if (hasIssues) {
      p.outro(c.yellow('Sync completed with issues'))
      process.exit(1)
    }
    else {
      p.outro(c.green('Sync completed successfully'))
    }
  }
  catch (err) {
    s.stop(c.red('Errors found:'))
    p.log.error(err instanceof Error ? err.message : String(err))
    p.outro(c.red('Sync failed'))
    process.exit(1)
  }
}

async function runSyncAll(failOnArchived: boolean = false, base?: string) {
  p.intro(c.bgCyan(c.black(' Nuxt Modules Sync ')))

  let only: string[] | undefined
  if (base) {
    only = getChangedModuleNames(base)
    if (only.length === 0) {
      p.outro(c.green('No modules changed'))
      return
    }
    p.log.info(`Syncing ${c.bold(only.length)} module(s) changed against ${c.cyan(base)}`)
  }

  const progress = p.progress({ max: 100 })
  progress.start('Starting sync...')

  let lastPercent = 0
  const result = await syncAll((current, total, moduleName) => {
    const percent = Math.round((current / total) * 100)
    const delta = percent - lastPercent
    if (delta > 0) {
      progress.advance(delta, `Syncing ${c.cyan(moduleName)} ${c.dim(`(${current}/${total})`)}`)
      lastPercent = percent
    }
  }, only)

  progress.stop(`Synced ${c.green(c.bold(result.synced.length))}${c.dim('/')}${result.total} modules`)

  if (result.warnings.length > 0) {
    p.log.warn(c.yellow(c.bold(`Warnings (${result.warnings.length})`)))
    for (const { moduleName, message } of result.warnings.sort((a, b) => a.moduleName.localeCompare(b.moduleName))) {
      p.log.message(`  ${c.bold(moduleName)}: ${c.dim(message)}`)
    }
  }

  const hasErrors = result.errors.length > 0
  const hasRegressions = result.regressions.length > 0
  const hasArchived = result.archivedModules.length > 0
  const hasIssues = hasErrors || hasRegressions || (hasArchived && failOnArchived)

  if (hasIssues) {
    p.log.message('')
  }

  if (hasErrors) {
    p.log.error(c.red(c.bold(`Failed to sync ${result.errors.length} module(s)`)))
    for (const { moduleName, error } of result.errors) {
      p.log.message(`  ${c.red(c.bold(moduleName))}: ${c.dim(error.message)}`)
    }
  }

  if (hasRegressions) {
    p.log.warn(c.yellow(c.bold(`Regressions detected (${result.regressions.length})`)))
    for (const r of result.regressions) {
      const typeColor = r.type === 'compatibility' ? c.magenta : c.blue
      p.log.message(`  ${c.dim('[')}${typeColor(r.type)}${c.dim(']')} ${c.bold(r.moduleName)}: ${r.description}`)
    }
  }

  if (hasArchived) {
    p.log.warn(c.yellow(c.bold(`Archived repositories (${result.archivedModules.length})`)))
    for (const name of result.archivedModules) {
      p.log.message(`  ${c.red(name)}`)
    }
  }

  if (hasIssues) {
    p.outro(c.yellow('Sync completed with issues'))
    process.exit(1)
  }
  else {
    p.outro(c.green('Sync completed successfully'))
  }
}

async function runBuild() {
  p.intro(c.bgCyan(c.black(' Nuxt Modules Build ')))

  const s = p.spinner()
  s.start('Building modules...')

  try {
    await build()
    s.stop(c.green('Build complete'))
    p.outro(c.green('Build completed successfully'))
  }
  catch (err) {
    s.stop(c.red('Build failed'))
    p.log.error(err instanceof Error ? err.message : String(err))
    p.outro(c.red('Build failed'))
    process.exit(1)
  }
}

main()
