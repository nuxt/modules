# Nuxt Modules

[![automated](https://flat.badgen.net/badge/publish/automated/green)](#)
[![npm version](https://flat.badgen.net/npm/v/@nuxt/modules)](https://www.npmjs.com/package/@nuxt/modules)

> Discover Nuxt modules to supercharge your project! Created by the Nuxt team and community.

👉 https://modules.nuxtjs.org

## Modules Database

Metadata of nuxt modules are maintained in [yml](https://en.wikipedia.org/wiki/YAML) files inside [./modules](./modules) directory and automatically synced from upstream to fetch latest information.

### Contribution

- If you feel a module is missing, please create a new [issue](https://github.com/nuxt/modules/issues/new)
- If some data is outdated please directly open a pull request

### Using CDN

Compiled JSON data is available from following CDNs:

- **jsdelivr:** https://cdn.jsdelivr.net/npm/@nuxt/modules@latest/modules.json
- **unpkg:** https://unpkg.com/@nuxt/modules@latest/modules.json

### Using npm package

You can use the `@nuxt/modules` package by installing it in your project:

```bash
# npm
npm install @nuxt/modules

# yarn
yarn add @nuxt/modules
```

Then you can directly import the list of modules:

```js
// ESM
import modules from '@nuxt/modules'

// CommonJS
const modules = require('@nuxt/modules')
```

### Schema

Field Name      | Auto sync | Description
----------------|-----------|--------------
`name`          | No        | Canonical name or integration name
`description`   | Yes       | Short description
`repo`          | No        | GitHub repository. Format is `org/name` or `org/name#main/path`
`npm`           | Yes       | NPM package name
`icon`          | No        | Icon of module from [./website/public/icons](./website/public/icons) directory
`github`        | No        | GitHub URL
`website`       | No        | Website URL
`learn_more`    | No        | Link to learn more (website or relevant integration website)
`category`      | No        | Module category from [./lib/categories.json](./lib/categories.json)
`type`          | No        | `community` (for [nuxt-community](https://github.com/nuxt-community/)), `official` (for https://github.com/) or `3rd-party`
`maintainers`   | Yes       | List of maintainers each item has `name`, `github` and `avatar`
`compatibility` | No        | Module compatibility status. `nuxt` field specifies semver of supported nuxt version. `requires.bridge: true|optional` can be used to specify Nuxt 2 bridge compatibility.


## Maintenance

### Add or update repository

```bash
yarn sync <name> <repo>
```

Example: `yarn sync tailwindcss nuxt-community/tailwindcss-module`

To sync with a branch different than `master`, suffix the repo with `#repo-branch`, example: `yarn sync tailwindcss nuxt-community/tailwindcss-module#dev`

### Auto update all current modules

```bash
yarn sync
```

### Generate `npm/modules.json`

```bash
yarn build
```

## Website development

- Clone repository
- Install website depenedencies using `npx yarn install`

Start development:

```bash
npx yarn dev
```

Then visit http://localhost:3000

In the development, the npm downloads and GitHub stars will be mocked unless setting `USE_NUXT_API` variable.

## License

[MIT](./LICENSE) - Made by Nuxt Team
