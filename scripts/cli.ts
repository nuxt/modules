import { sync, syncAll, dump } from './integration'

async function main() {
  const [command, ...args] = process.argv.splice(2)

  switch (command) {
    case 'sync':
      const [repo] = args
      if (repo) {
        const { integrationFile } = await sync(repo)
        console.log('Synced', integrationFile)
      } else {
        console.log('Syncing all integrations')
        const integrations = await syncAll()
        console.log('Sync ' + integrations.length + ' integrations!')
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
