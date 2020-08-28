import { sync, syncAll, dump } from './integration'

async function main() {
  const [command, ...args] = process.argv.splice(2)

  switch (command) {
    case 'sync':
      const [name, repo] = args
      if (name) {
        console.log('Syncing ' + name)
        const integration = await sync(name, repo)
        console.log('Synced', integration.name)
      } else {
        console.log('Syncing all integrations')
        const integrations = await syncAll()
        console.log('Sync ' + integrations.length + ' integrations')
      }
      break
    case 'dump':
      await dump()
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
