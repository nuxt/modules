<template>
  <Nuxt/>
</template>

<style>
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('DM Sans Regular'), local('DMSans-Regular'), url(https://fonts.gstatic.com/s/dmsans/v5/rP2Hp2ywxg089UriCZ2IHSeH.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('DM Sans Regular'), local('DMSans-Regular'), url(https://fonts.gstatic.com/s/dmsans/v5/rP2Hp2ywxg089UriCZOIHQ.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
</style>

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
