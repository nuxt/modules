import fs from 'fs-extra'
import path from 'path'
import hasha from 'hasha'
import { rootDir, distFile } from './utils'
import { build } from './module'

export async function version() {
  await build()

  const pkgFile = path.resolve(rootDir, 'package.json')
  const pkg = await fs.readJson(pkgFile)

  const hash = hasha(await fs.readFile(distFile)).substr(0, 6)

  pkg.version = pkg.version.split('-')[0] + '-' + hash

  await fs.writeFile(pkgFile, JSON.stringify(pkg, null, 2))
}
