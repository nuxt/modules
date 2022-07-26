import FloatingVue from 'floating-vue'
import { defineNuxtPlugin } from '#app'
import 'floating-vue/dist/style.css'

export default defineNuxtPlugin(({ vueApp }) => {
  if (process.client) {
    vueApp.use(FloatingVue)
  } else {
    vueApp.directive('tooltip', {})
  }
})
