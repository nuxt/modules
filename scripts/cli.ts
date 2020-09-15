import { sync, syncAll, build } from './integration'
import { version } from './version'

async function main() {
  const [command, ...args] = process.argv.splice(2)

  switch (command) {
    case 'sync':
      const [name, repo] = args
      if (name) {
        console.log('Syncing ' + (name === '-' ? repo : name))
        const integration = await sync(name, repo)
        console.log('Synced', integration.name)
      } else {
        console.log('Syncing all integrations')
        const integrations = await syncAll()
        console.log('Sync ' + integrations.length + ' integrations')
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

main().catch(err => {
  console.error(err)
  process.exit(1)
})
