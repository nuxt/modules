<template>
  <TheMain :state="state" />
</template>

<script>
import { fetchModules } from '~/composables/fetch'

export default {
  async asyncData () {
    return {
      state: await fetchModules()
    }
  }
}
</script>
