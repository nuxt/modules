// import { NuxtConfig } from '@nuxt/types'

export default /*<NuxtConfig>*/ {
  target: 'static',
  components: true,
  buildModules: [
    // Doc: https://tailwindcss.nuxtjs.org
    '@nuxtjs/tailwindcss',
    // Doc: https://github.com/nuxt-community/google-fonts-module
    '@nuxtjs/google-fonts',
    '@nuxt/typescript-build',
    // Doc: https://image.nuxtjs.org
    '@nuxt/image',
    // Doc: https://pwa.nuxtjs.org
    '@nuxtjs/pwa'
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
  googleFonts: {
    families: {
      'DM Sans': true
    }
  },
  meta: {
    name: 'Nuxt Modules',
    short_name: 'Nuxt Modules',
    description: 'Explore Nuxt Modules',
  }
}
