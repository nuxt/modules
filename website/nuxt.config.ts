import { defineNuxtConfig } from 'nuxt3'

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
    // https://github.com/windicss/nuxt-windicss
    // 'nuxt-windicss',
    // https://image.nuxtjs.org
    // '@nuxt/image',
    // https://pwa.nuxtjs.org
    '@nuxtjs/pwa',
    // https://github.com/moritzsternemann/vue-plausible
    // 'vue-plausible',
    // https://html-validator.nuxtjs.org
    // '@nuxtjs/html-validator',
    // '@nuxtjs/color-mode',
    'v-tooltip/nuxt',
    '@unocss/nuxt',
    '@vueuse/nuxt'
  ],
  plugins: [
    '~/plugins/unocss',
    '~/plugins/v-tooltip.ts'
  ],
  vueuse: {
    autoImports: true,
    ssrHandlers: true
  },
  unocss: {
    include: [/\.vue$/, /\.ts$/, /\.vue\?vue/],
    icons: {
      scale: 1.2,
      extraProperties: {
        display: 'inline-block'
      }
    },
    preflight: true,
    theme: {
      colors: {
        'secondary-surface': '#E5F9FF',
        'secondary-lightest': '#B7E1ED',
        'secondary-lighter': '#95CDDE',
        'secondary-light': '#71A2B0',
        secondary: '#497A87',
        'secondary-dark': '#255461',
        'secondary-darker': '#003543',
        'secondary-darkest': '#022a35',
        'secondary-black': '#001E26'
      },
      fontFamily: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono'
      },
      transitionProperty: {
        height: 'height'
      }
    },
    shortcuts: {
      'nuxt-border': 'border-gray-200 dark:border-secondary-darker',
      'nuxt-card-border': 'border border-gray-200 dark:border-secondary-darker hover:border-primary-800 focus:border-primary-800 dark:hover:border-secondary dark:focus:border-secondary focus:outline-none',
      'nuxt-card-bg': 'bg-white dark:bg-secondary-darkest',
      'nuxt-text-default': 'text-sky-darkest dark:text-white',

      'nuxt-text-highlight': 'py-2 px-4 rounded-md bg-gray-100 dark:bg-white dark:bg-opacity-10 hover:bg-gray-200',
      'nuxt-text-highlight-hover': 'nuxt-text-highlight dark:hover:bg-opacity-9 light:hover:bg-gray-50'
    }
  }
  // plugins: ['~/plugins/v-tooltip.ts'],
  // manifest: {
  //   name: 'Nuxt Modules',
  //   short_name: 'Nuxt Modules',
  //   description: 'Explore Nuxt Modules',
  //   theme_color: '#003c3c'
  // },
  // plausible: {
  //   domain: 'modules.nuxtjs.org'
  // },
  // colorMode: {
  //   preference: 'system',
  //   fallback: 'light',
  //   classSuffix: ''
  // },
  // bridge: {
  //   vite: true
  // }
})
