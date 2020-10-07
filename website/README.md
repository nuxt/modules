## nuxtjs.dev

Discover Nuxt modules on [nuxtjs.dev](https://nuxtjs.dev)

### Development

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
