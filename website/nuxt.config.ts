import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
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
    '@unocss/nuxt',
    '@vueuse/core/nuxt'
  ],
  unocss: {
    include: [/\.vue$/, /\.ts$/, /\.vue\?vue/],
    icons: {
      scale: 1.2,
      extraProperties: {
        display: 'inline-block'
      }
    },
    // disable the default preset, Windi CSS already handles them
    uno: false
  },
  plugins: ['~/plugins/v-tooltip.ts'],
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
