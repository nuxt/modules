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
    // Doc: https://github.com/moritzsternemann/vue-plausible
    'vue-plausible',
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
  plausible: {
    domain: 'modules.nuxtjs.org'
  }
}
