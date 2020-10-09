// import { NuxtConfig } from '@nuxt/types'

export default /*<NuxtConfig>*/ {
  target: 'static',
  components: true,
  buildModules: [
    // Doc: https://tailwindcss.nuxtjs.org
    '@nuxtjs/tailwindcss',
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
  manifest: {
    name: 'Nuxt Modules',
    short_name: 'Nuxt Modules',
    description: 'Explore Nuxt Modules',
  }
}
