<template>
  <div class="flex items-center justify-between w-full container mx-auto px-4 sm:px-0 py-2">
    <div class="flex">
      <IconNuxtLogo alt="Nuxt" width="40" height="40" />
      <div class="text-2xl my-auto ml-1 pt-0.5">
        Modules
      </div>
    </div>
    <slot />
    <button aria-label="Toggle theme" class="!outline-none text-xl h-1.2em my-auto" @click="toggleDarkMode()">
      <ColorScheme placeholder="..." tag="span">
        <span v-if="$colorMode.preference === 'system'" class="i-carbon-laptop" />
        <span v-else-if="$colorMode.value === 'dark'" class="i-carbon-moon" />
        <span v-else class="i-carbon-sun" />
      </ColorScheme>
    </button>
  </div>
</template>
<script>
export default {
  methods: {
    toggleDarkMode () {
      if (this.$colorMode.preference === 'system') {
        this.$colorMode.preference = 'dark'
      } else if (this.$colorMode.preference === 'dark') {
        this.$colorMode.preference = 'light'
      } else {
        this.$colorMode.preference = 'system'
      }
    }
  }
}
</script>
