// import { NuxtConfig } from '@nuxt/types'

export default /*<NuxtConfig>*/ {
  target: 'static',
  components: true,
  build: {
    loaders: {
      imgUrl: { limit: 0 }
    }
  },
  buildModules: [
    // Doc: https://tailwindcss.nuxtjs.org
    '@nuxtjs/tailwindcss',
    '@nuxt/typescript-build',
    // Doc: https://image.nuxtjs.org
    '@nuxt/image',
    // Doc: https://pwa.nuxtjs.org
    '@nuxtjs/pwa',
    // Doc: https://github.com/bdrtsky/nuxt-ackee
    'nuxt-ackee'
  ],
  modules: [
    '~/scripts/content',
    // Doc: https://content.nuxtjs.org
    '@nuxt/content',
    '@nuxtjs/feed',
  ],
  plugins: [
    '~/plugins/v-tooltip.ts'
  ],
  content: {
    dir: 'modules'
  },
  manifest: {
    name: 'Nuxt Modules',
    short_name: 'Nuxt Modules',
    description: 'Explore Nuxt Modules',
    theme_color: '#003c3c'
  },
  ackee: {
    server: 'https://ackee.nuxtjs.com',
    domainId: 'ab823e69-2425-4a16-85c8-bd9b42d11e1e',
    detailed: true
  },
  feed() {
    const feedFormats = {
      rss: { type: 'rss2', file: 'rss.xml' },
      json: { type: 'json1', file: 'feed.json' },
    }
    const { $content } = require('@nuxt/content')

    const createFeedItems = async feed => {
      feed.options = {
        title: 'Nuxt Modules',
        link: 'https://modules.nuxtjs.org/',
        description: 'Discover our list of modules to supercharge your Nuxt project. Created by the Nuxt team and community.',
      }

      const modules = await $content()
        .sortBy('createdAt', 'desc')
        .limit(10)
        .fetch()

      for (const { name, website, createdAt, description, icon, category, type, maintainers } of modules) {
        let content = ``
        if (icon)
          content += `<img width="64px" height="64px" src="https://modules.nuxtjs.org/icons/${icon}" alt="" role="presentation">`

        content += `
          <h1>${name}</h1>
          <p>${description}</p>
          <a href="${website}">${website}</a>
          <hr>
        `

        if (category)
          content += `<p>Category: ${category}</p>`

        if (type)
          content += `<p>Type: ${type}</p>`

        if (maintainers && maintainers.length) {
          content += `
            <h2>Maintainers</h2>
            <ul>
          `
          content += maintainers
            .map(({name, github}) => `<li><a href="https://github.com/${github}">${name}</a></li>`)
            .join('')
          content += `</ul>`
        }

        feed.addItem({
          title: name,
          id: website,
          link: website,
          date: new Date(createdAt),
          description: content,
          author: ''
        })
      }
    }

    return Object.values(feedFormats).map(({ file, type }) => ({
      path: file,
      type,
      create: createFeedItems,
    }))
  }
}
