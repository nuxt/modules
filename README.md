[![Explore Nuxt Modules to build Vue applications](https://user-images.githubusercontent.com/904724/210616249-25aec46e-ab06-4b4d-9154-10b02546d558.jpg)](https://nuxt.com/modules)

# Nuxt Modules

[![npm version][npm-version-src]][npm-version-href]
[![Nuxt][nuxt-src]][nuxt-href]
[![Volta][volta-src]][volta-href]

> Discover the Nuxt modules to add any CMS, Database, UI, Auth and integrations into your Vue application.

- 🔗 [Modules listing](https://nuxt.com/modules)
- 📖 [Module author guide](https://nuxt.com/docs/guide/going-further/modules)

## Modules Database

Metadata of nuxt modules are maintained in [yml](https://en.wikipedia.org/wiki/YAML) files inside [./modules](./modules) directory and automatically synced from upstream to fetch latest information.

### Add/Update a module

```bash
pnpm sync <name> <repo>
```

Example: `pnpm sync tailwindcss nuxt-modules/tailwindcss`

To sync with a branch different than `main`, suffix the repo with `#repo-branch`, example: `pnpm sync tailwindcss nuxt-modules/tailwindcss#dev`

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

# pnpm
pnpm add @nuxt/modules
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
`category`      | No        | Module category from [./lib/categories.ts](./lib/categories.ts)
`type`          | No        | `community` (for [nuxt-community](https://github.com/nuxt-community/)), `official` (for https://github.com/) or `3rd-party`
`maintainers`   | Yes       | List of maintainers each item has `name`, `github` and `avatar`
`compatibility` | No        | Module compatibility status. `nuxt` field specifies semver of supported nuxt version. `requires.bridge: true\|optional` can be used to specify Nuxt 2 bridge compatibility.


## Maintenance

### Auto update all current modules

```bash
pnpm sync
```

### Generate `modules.json`

```bash
pnpm build
```

## License

[MIT](./LICENSE) - Made by Nuxt Team

[npm-version-src]: https://img.shields.io/npm/v/@nuxt/modules/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@nuxt/modules

[nuxt-src]: https://img.shields.io/badge/Nuxt%20Modules-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com/modules

[volta-src]: https://user-images.githubusercontent.com/904724/209143798-32345f6c-3cf8-4e06-9659-f4ace4a6acde.svg
[volta-href]: https://volta.net/nuxt/modules?utm_source=readme_nuxt_modules

## Contributors

<img src="https://markupgo.com/github/nuxt/modules/contributors?count=0&circleSpacing=10&center=true" width="100%" />
