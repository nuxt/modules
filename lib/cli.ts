import { sync, syncAll, build } from './modules'
import { version } from './version'

async function main() {
  const [command, ...args] = process.argv.splice(2)

  switch (command) {
    case 'sync':
      {
        const [name, repo] = args
        if (name) {
          console.log('Syncing ' + (name === '-' ? repo : name))
          const { module, regressions } = await sync(name, repo, true)
          console.log('Synced', module.name)
          if (regressions.length > 0) {
            console.log('\nRegressions detected:')
            for (const r of regressions) {
              console.log(`  - [${r.type}] ${r.description}`)
            }
          }
        }
        else {
          console.log('Syncing all modules')
          const { count, success, regressions } = await syncAll()
          console.log('Synced ' + count + ' modules')
          if (regressions.length > 0) {
            console.log('\nRegressions detected (' + regressions.length + '):')
            for (const r of regressions) {
              console.log(`  - [${r.type}] ${r.moduleName}: ${r.description}`)
            }
          }
          if (!success)
            process.exit(1)
        }
      }
      break
    case 'build':
      await build()
      break
    case 'version':
      await version()
      break
    default:
      console.error('Unknown command: ' + command)
      process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
