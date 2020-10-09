// import { NuxtConfig } from '@nuxt/types'

export default /*<NuxtConfig>*/ {
  target: 'static',
  components: true,
  buildModules: [
    // Doc: https://tailwindcss.nuxtjs.org
    '@nuxtjs/tailwindcss',
    // Doc: https://github.com/nuxt-community/google-fonts-module
    '@nuxtjs/google-fonts',
    '@nuxt/typescript-build'
  ],
  modules: [
    '~/scripts/content',
    // Doc: https://content.nuxtjs.org
    '@nuxt/content',
    // Doc: https://pwa.nuxtjs.org
    '@nuxtjs/pwa'
  ],
  plugins: [
    '~/plugins/v-tooltip.ts'
  ],
  content: {
    dir: 'modules'
  },
  googleFonts: {
    families: {
      'DM Sans': true
    }
  },
  pwa: {
    meta: {
      name: 'modules.nuxtjs.org'
    }
  }
}
