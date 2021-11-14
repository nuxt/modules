import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  components: true,
  buildModules: [
    // https://github.com/windicss/nuxt-windicss
    'nuxt-windicss',
    // https://image.nuxtjs.org
    // '@nuxt/image',
    // https://pwa.nuxtjs.org
    '@nuxtjs/pwa',
    // https://github.com/moritzsternemann/vue-plausible
    'vue-plausible',
    // https://html-validator.nuxtjs.org
    '@nuxtjs/html-validator',
    '@nuxtjs/color-mode',
    '@unocss/nuxt'
  ],
  unocss: {
    uno: false,
    icons: {
      scale: 1.2,
      extraProperties: {
        display: 'inline-block'
      }
    }
  },
  plugins: ['~/plugins/v-tooltip.ts', '~/plugins/modules.ts'],
  manifest: {
    name: 'Nuxt Modules',
    short_name: 'Nuxt Modules',
    description: 'Explore Nuxt Modules',
    theme_color: '#003c3c'
  },
  plausible: {
    domain: 'modules.nuxtjs.org'
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },
  bridge: {
    vite: true
  }
})
