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
    // Doc: https://http.nuxtjs.org
    '@nuxt/http',
    // Doc: https://pwa.nuxtjs.org
    '@nuxtjs/pwa'
  ],
  plugins: [
    '~/plugins/v-tooltip.ts'
  ],
  googleFonts: {
    families: {
      'DM Sans': true
    }
  },
  serverMiddleware: {
    '/api/modules': '~/api/modules.ts'
  },
  pwa: {
    meta: {
      name: 'modules.nuxtjs.org'
    }
  }
}
