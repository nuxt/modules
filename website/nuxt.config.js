export default {
  target: 'static',
  components: true,
  buildModules: [
    // Doc: https://tailwindcss.nuxtjs.org
    '@nuxtjs/tailwindcss',
    // Doc: https://github.com/nuxt-community/google-fonts-module
    '@nuxtjs/google-fonts'
  ],
  modules: [
    // Doc: https://http.nuxtjs.org
    '@nuxt/http',
    // Doc: https://pwa.nuxtjs.org
    '@nuxtjs/pwa'
  ],
  plugins: ['~/plugins/v-tooltip.js'],
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