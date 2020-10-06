export default {
  components: true,
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // Doc: https://github.com/nuxt-community/google-fonts-module
    '@nuxtjs/google-fonts'
  ],
  modules: [
    // Doc: https://http.nuxtjs.org
    '@nuxt/http'
  ],
  plugins: ['~/plugins/v-tooltip.js'],
  googleFonts: {
    families: {
      'DM Sans': true
    }
  }
}