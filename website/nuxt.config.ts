import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  target: 'static',
  components: true,
  buildModules: [
    // https://github.com/windicss/nuxt-windicss
    'nuxt-windicss',
    // https://image.nuxtjs.org
    '@nuxt/image',
    // https://pwa.nuxtjs.org
    '@nuxtjs/pwa',
    // https://github.com/moritzsternemann/vue-plausible
    'vue-plausible',
    // https://html-validator.nuxtjs.org
    '@nuxtjs/html-validator'
  ],
  plugins: [
    '~/plugins/v-tooltip.ts',
    '~/plugins/modules.ts'
  ],
  manifest: {
    name: 'Nuxt Modules',
    short_name: 'Nuxt Modules',
    description: 'Explore Nuxt Modules',
    theme_color: '#003c3c'
  },
  plausible: {
    domain: 'modules.nuxtjs.org'
  },
  // TODO: Do we still need this?
  build: {
    loaders: {
      imgUrl: { limit: 0 }
    }
  },
  image: {
    // vercel: {},
    provider: 'static',
    screens: {
      icon: 40,
      avatar: 24
    },
    domains: [
      'avatars.githubusercontent.com',
      'avatars0.githubusercontent.com',
      'avatars1.githubusercontent.com',
      'avatars2.githubusercontent.com',
      'avatars3.githubusercontent.com'
    ]
  }
})
