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
    <button aria-label="Toggle theme" class="!outline-none" @click="toggleDarkMode()">
      <IconMoon v-if="$colorMode.preference === 'dark'" />
      <IconSun v-else-if="$colorMode.preference === 'light'" />
      <IconSystem v-else aria-label="System theme" />
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
