// import { NuxtConfig } from '@nuxt/types'

export default /* <NuxtConfig> */ {
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
    'nuxt-ackee',
    // Doc: https://html-validator.nuxtjs.org
    '@nuxtjs/html-validator'
  ],
  modules: [
    '~/scripts/content',
    // Doc: https://content.nuxtjs.org
    '@nuxt/content'
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
  }
}
