import { NuxtConfig } from '@nuxt/types'

export default <NuxtConfig> {
  target: 'static',
  components: true,
  build: {
    loaders: {
      imgUrl: { limit: 0 }
    }
  },
  buildModules: [
    // https://tailwindcss.nuxtjs.org
    '@nuxtjs/tailwindcss',
    // https://typescript.nuxtjs.org/
    '@nuxt/typescript-build',
    // https://image.nuxtjs.org
    '@nuxt/image',
    // https://pwa.nuxtjs.org
    '@nuxtjs/pwa',
    // https://github.com/moritzsternemann/vue-plausible
    'vue-plausible',
    // https://html-validator.nuxtjs.org
    '@nuxtjs/html-validator'
  ],
  modules: [
    // https://content.nuxtjs.org
    '~/scripts/content',
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
  plausible: {
    domain: 'modules.nuxtjs.org'
  },
  typescript: {
    typeCheck: false
  },
  image: {
    screens: {
      icon: 40,
      avatar: 24
    },
    domains: [
      'https://avatars0.githubusercontent.com',
      'https://avatars1.githubusercontent.com',
      'https://avatars2.githubusercontent.com',
      'https://avatars3.githubusercontent.com'
    ]
  }
}
