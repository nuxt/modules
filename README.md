# Nuxt Modules

[![automated](https://flat.badgen.net/badge/publish/automated/green)](#)
[![npm version](https://flat.badgen.net/npm/v/@nuxt/modules)](https://www.npmjs.com/package/@nuxt/modules)

## Contribution

- If you feel a module is missing, please create a new [issue](https://github.com/nuxt/modules/issues/new)
- If some meta is wrong, feel free directly opening a PR

### Website

Create a [personnal GitHub token](https://github.com/settings/tokens) (no scope selected) and add it to `.env`:

```bash
# .env
GITHUB_TOKEN=<my-generated-github-token>
```

To have updates to the `modules/` directory, run `yarn link`  in the root directory and `yarn link @nuxt/modules` in the `website/` directory. You will have to run `yarn build` in the root directory everytime you change a file in `modules/`.

Then start Vercel in development **in the root of the project**:

```bash
vercel dev
```

Then go to http://localhost:3000

### Add/Update repository

`yarn sync <name> <repo>`

Example: `yarn sync tailwindcss nuxt-community/tailwindcss-module`

### Auto update all current modules

`yarn sync`

### Generate `dist/module.json`

`yarn build`

## License

MIT
