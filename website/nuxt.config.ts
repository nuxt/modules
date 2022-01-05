import { defineNuxtConfig } from '@nuxt/bridge'
import unocssConfig from './unocss.config'

const title = 'Explore Nuxt Modules'
const description = 'Discover our list of modules to supercharge your Nuxt project. Created by the Nuxt team and community.'
const url = 'https://modules.nuxtjs.org'

export default defineNuxtConfig({
  head: {
    bodyAttrs: {
      class: 'min-h-screen'
    },
    title,
    meta: [
      { hid: 'charset', charset: 'utf-8' },
      { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
      { hid: 'og:site_name', property: 'og:site_name', content: title },
      { hid: 'og:description', property: 'og:description', content: description },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: url },
      { hid: 'og:image', property: 'og:image', content: `${url}/preview.png` },
      // Twitter Card
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@nuxt_js' },
      { hid: 'twitter:title', name: 'twitter:title', content: title },
      { hid: 'twitter:description', name: 'twitter:description', content: description },
      { hid: 'twitter:image', name: 'twitter:image', content: `${url}/preview.png` },
      { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: title }
    ],
    link: [
      { hid: 'favicon', rel: 'icon', type: 'image/png', href: '/icon.png' },
      { hid: 'search', rel: 'search', type: 'application/opensearchdescription+xml', href: '/search.xml', title: 'Nuxt Modules' }
    ]
  },
  components: true,
  buildModules: [
    // https://image.nuxtjs.org
    // '@nuxt/image',
    // https://pwa.nuxtjs.org
    '@nuxtjs/pwa',
    // https://github.com/moritzsternemann/vue-plausible
    'vue-plausible',
    // https://html-validator.nuxtjs.org
    '@nuxtjs/html-validator',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxt/bridge'
  ],
  vueuse: {
    autoImports: true,
    ssrHandlers: true
  },
  unocss: {
    preflight: false
  },
  plugins: [
    '~/plugins/unocss',
    '~/plugins/v-tooltip.ts'
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
  bridge: {
    meta: true,
    autoImports: true,
    vite: true
  }
})
