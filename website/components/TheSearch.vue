<template>
  <div class="flex items-center justify-between w-full container mx-auto px-4 sm:px-0 py-2">
    <div class="flex">
      <a href="/" class="inline-flex text-2xl">
        <IconNuxtLogo alt="Nuxt" width="40" height="40" />
        <span class="my-auto ml-1 pt-0.5">
          Modules
        </span>
      </a>
    </div>
    <slot />
    <button aria-label="Toggle theme" class="!outline-none text-xl h-1.2em my-auto" @click="toggleDarkMode()">
      <ColorScheme placeholder="..." tag="span">
        <UnoIcon v-if="$colorMode.preference === 'system'" class="i-carbon-laptop" />
        <UnoIcon v-else-if="$colorMode.value === 'dark'" class="i-carbon-moon" />
        <UnoIcon v-else class="i-carbon-sun" />
      </ColorScheme>
    </button>
  </div>
</template>
<script>
const toggleNext = {
  system: 'dark', // TODO
  dark: 'light',
  light: 'dark'
}
export default {
  methods: {
    toggleDarkMode () {
      this.$colorMode.preference = toggleNext[this.$colorMode.preference] || 'system'
    }
  }
}
</script>
