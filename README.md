# Nuxt Modules

[![automated](https://flat.badgen.net/badge/publish/automated/green)](#)
[![npm version](https://flat.badgen.net/npm/v/@nuxt/modules)](https://www.npmjs.com/package/@nuxt/modules)

> Discover Nuxt modules to supercharge your project! Created by the Nuxt team and community.

👉 https://modules.nuxtjs.org

## Modules Database

Meta-data of nuxt modules are maintained in [yml](https://en.wikipedia.org/wiki/YAML) files inside [/modules](./modules) directory and automatically synced from upstream to fetch latest information.

### Contribution

- If you feel a module is missing, please create a new [issue](https://github.com/nuxt/modules/issues/new)
- If some data is outdated, directly opening a pull request

### Using CDN

Compiled JSON data is available from following CDNs:

- **jsdelivr:**: https://cdn.jsdelivr.net/npm/@nuxt/modules/dist/modules.json
- **unpkg:** https://unpkg.com/@nuxt/modules/dist/modules.json

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

Field Name    | Auto sync | Description
--------------|-----------|--------------
name          | No        | Cannonical name of module
description   | Yes       | Module short description
repo          | No        | Github repository. Format is `org/name` or `org/name#main/path`
npm           | Yes       | NPM package name
icon          | No        | Icon of module from [/static/icons](./static/icons) directory
github        | No        | Github URL
website       | No        | Website URL
learn_more    | No        | Link to learn more (website or relevant integration website)
category      | No        | Module category from [/categories.json](./categories.json)
type          | No        | `community` (for [nuxt-community](https://github.com/nuxt-community/)), `official` (for https://github.com/) or `3rd-party`
maintainers   | Yes       | List of maintainers each item has `name`, `github` and `avatar`
compatibility | No        | Module compatibility status. Valid keys are `2.x`, `2.x-bridge` and `3.x` and valid values are `working`, `wip`, `unknown`, `broken` and `rip`. Please see [this discussion](https://github.com/nuxt/framework/discussions/751) for more information.


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

### Generate `dist/module.json`

```sh
yarn build
```


## Website development

- Clone repository
- Install depenedencies using `npx yarn install`

Start development:

```bash
npx yarn dev
```

Then visit http://localhost:3000

In development, the npm downloads and GitHub stars will be mocked.

### Production build

Create a [personnal GitHub token](https://github.com/settings/tokens) (no scope selected) and add it to `.env`:

```sh
# .env
GITHUB_TOKEN=<my-generated-github-token>
```

Generate the website:

```sh
yarn generate
```

Start the production website:

```sh
yarn start
```

## License

[MIT](./LICENSE) - Made by Nuxt Team
