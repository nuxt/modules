![nuxt/modules](https://modules.nuxtjs.org/preview.png)

# Nuxt Modules

[![automated](https://flat.badgen.net/badge/publish/automated/green)](#)
[![npm version](https://flat.badgen.net/npm/v/@nuxt/modules)](https://www.npmjs.com/package/@nuxt/modules)

## Contribution

- If you feel a module is missing, please create a new [issue](https://github.com/nuxt/modules/issues/new)
- If some meta is wrong, feel free directly opening a pull request

### Add or update repository

`yarn sync <name> <repo>`

Example: `yarn sync tailwindcss nuxt-community/tailwindcss-module`

### Auto update all current modules

`yarn sync`

### Generate `dist/module.json`

`yarn build`

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

```
yarn build
yarn start
```

## License

MIT Nuxt.js Team
