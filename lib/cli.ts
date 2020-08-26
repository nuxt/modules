import { sync, syncAll, dump } from './resource'

async function main() {
  const [command, ...args] = process.argv.splice(2)

  switch (command) {
    case 'sync':
      const [repo] = args
      if (repo) {
        const { resourceFile } = await sync(repo)
        console.log('Synced', resourceFile)
      } else {
        console.log('Syncing all resources')
        await syncAll()
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
