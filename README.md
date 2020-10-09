[![nuxt/modules](https://modules.nuxtjs.org/preview.png)](https://modules.nuxtjs.org)

> Official and community [Nuxt](https://nuxtjs.org) modules united on [modules.nuxtjs.org](https://modules.nuxtjs.org)

# Nuxt Modules

[![automated](https://flat.badgen.net/badge/publish/automated/green)](#)
[![npm version](https://flat.badgen.net/npm/v/@nuxt/modules)](https://www.npmjs.com/package/@nuxt/modules)

## Usage

You can use the `@nuxt/modules` package by installing it in your project:

```bash
npm install @nuxt/modules
# Or yarn add @nuxt/modules
```

Then you can directly import the list of modules:

```js
const modules = require('@nuxt/modules')
// modules is an array of objects
// See https://unpkg.com/@nuxt/modules/dist/modules.json
```

## Contributing

- If you feel a module is missing, please create a new [issue](https://github.com/nuxt/modules/issues/new)
- If some meta is wrong, feel free directly opening a pull request

### Add or update repository

```bash
yarn sync <name> <repo>
```

Example: `yarn sync tailwindcss nuxt-community/tailwindcss-module`

### Auto update all current modules

```bash
yarn sync
```

### Generate `dist/module.json`

```
yarn build
```

## Website

### Development

Start Nuxt in development:

```bash
yarn dev
```

Then visit http://localhost:3000.

In development, the npm downloads and GitHub stars will be mocked.

### Production

Create a [personnal GitHub token](https://github.com/settings/tokens) (no scope selected) and add it to `.env`:

```bash
# .env
GITHUB_TOKEN=<my-generated-github-token>
```

Generate the website:

```
yarn generate
```

Start the production website:

```bash
yarn start
```

## License

MIT Nuxt.js Team
