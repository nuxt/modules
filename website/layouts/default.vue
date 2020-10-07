<template>
  <Nuxt/>
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      class: 'bg-cloudy-grey min-h-screen'
    },
    link: [
      { rel: 'shortcut icon', href: '/favicon.ico' }
    ],
    meta: [
      { hid: 'charset', charset: 'utf-8' },
      { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  }  
}
</script>
