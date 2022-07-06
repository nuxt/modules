<template>
  <TheMain :state="state" />
</template>

<script setup lang="ts">
import '@unocss/reset/tailwind.css'
import 'uno.css'
import '~/assets/css/main.css'
import { fetchModules } from '~/composables/fetch'

const state = await fetchModules()
</script>
