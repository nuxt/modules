<template>
  <TheMain :state="state" />
</template>

<script setup lang="ts">
import { fetchModules } from '~/composables/fetch'

const state = await fetchModules()
</script>
