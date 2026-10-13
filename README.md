[![Explore Nuxt Modules to build Vue applications](https://github.com/user-attachments/assets/139f18eb-7bb1-4e37-8ef6-a94a60d6b0b0)](https://nuxt.com/modules)

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

If the module lives in a subdirectory of a monorepo, add the path after the branch, example: `pnpm sync scripts nuxt/scripts#main/packages/script`

### Contribution

To list a module, open a pull request directly. You don't need to open an issue first.

1. Fork and clone this repository, then run `pnpm install`.
2. Run `pnpm sync <name> <repo>` (see [Add/Update a module](#addupdate-a-module)). This creates `./modules/<name>.yml` from your repository's `package.json`.
3. Set `category` in the generated file to one of the values in [./lib/categories.ts](./lib/categories.ts). Optionally add an icon to [./icons](./icons) and reference it with `icon`.
4. Open a pull request.

If your module mainly loads a third-party script (analytics, tag manager, chat widget, consent manager, captcha, ads or embed), check whether [Nuxt Scripts](https://scripts.nuxt.com/scripts) already supports it. If it doesn't, consider adding it to the [Nuxt Scripts registry](https://github.com/nuxt/scripts). Modules that build on Nuxt Scripts are welcome too, for example when they add more than an API for the script, or when the script isn't a fit for the registry.

If some data is outdated, please open a pull request with the fix.

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
`icon`          | No        | Icon of module from [./icons](./icons) directory
`github`        | No        | GitHub URL
`website`       | No        | Website URL
`learn_more`    | No        | Link to learn more (website or relevant integration website)
`category`      | No        | Module category from [./lib/categories.ts](./lib/categories.ts)
`type`          | No        | `community` (for [nuxt-community](https://github.com/nuxt-community/)), `official` (for https://github.com/) or `3rd-party`
`maintainers`   | Yes       | List of maintainers each item has `name`, `github` and `avatar`
`compatibility` | No        | Module compatibility status. `nuxt` field specifies semver of supported nuxt version. `requires.bridge: true\|optional` can be used to specify Nuxt 2 bridge compatibility.
`mcp`           | No        | MCP Server URL


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

[npm-version-src]: https://npmx.dev/api/registry/badge/version/@nuxt/modules
[npm-version-href]: https://npmx.dev/package/@nuxt/modules

[nuxt-src]: https://img.shields.io/badge/Nuxt%20Modules-18181B?logo=nuxt
[nuxt-href]: https://nuxt.com/modules

[volta-src]: https://user-images.githubusercontent.com/904724/209143798-32345f6c-3cf8-4e06-9659-f4ace4a6acde.svg
[volta-href]: https://volta.net/nuxt/modules?utm_source=readme_nuxt_modules
