<template>
  <div class="flex items-center gap-4 justify-between w-full container mx-auto px-4 py-2">
    <slot name="head" />
    <div class="flex">
      <a href="/" class="inline-flex text-2xl">
        <IconNuxtLogo alt="Nuxt" width="40" height="40" />
        <span class="my-auto ml-1 pt-0.5">
          Modules
        </span>
      </a>
    </div>
    <div class="flex shadow-sm w-full max-w-xl">
      <label class="relative flex-1">
        <input
          ref="searchModuleInput"
          v-model="searchModel"
          type="search"
          aria-label="Search"
          class="block bg-gray-200 border-gray-300 dark:bg-secondary-dark dark:border-sky-darker w-full py-2 px-3 text-base leading-6 placeholder-gray-400 dark:placeholder-secondary-light transition duration-150 ease-in-out border-2  appearance-none md:pr-10 rounded-lg focus:ring-3 focus:ring-sky-dark focus:ring-opacity-50 focus:outline-none focus:placeholder-sky-darkest sm:flex-1"
          placeholder="Search a module (name, category, username, etc.)"
        >
        <span
          class="absolute hidden px-2 py-1 text-gray opacity-90 dark:text-gray-300 border border-sky-light rounded-md md:inline-block text-md top-1 right-4 leading-6"
        >/</span>
      </label>
    </div>
    <button aria-label="Toggle theme" class="!outline-none text-xl h-1.2em my-auto" @click="toggleDarkMode()">
      <ColorScheme placeholder="..." tag="span">
        <UnoIcon v-if="$colorMode.preference === 'system'" class="i-carbon-laptop" />
        <UnoIcon v-else-if="$colorMode.value === 'dark'" class="i-carbon-moon" />
        <UnoIcon v-else class="i-carbon-sun" />
      </ColorScheme>
    </button>
    <slot name="tail" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ search: string }>()
const emit = defineEmits<{(e: 'update:search', v: string): void }>()

const searchModel = computed<string>({
  get () {
    return props.search
  },
  set (v) {
    emit('update:search', v)
  }
})

const toggleNext = {
  system: 'dark', // TODO
  dark: 'light',
  light: 'dark'
}

const vm = getCurrentInstance().proxy
function toggleDarkMode () {
  vm.$colorMode.preference = toggleNext[vm.$colorMode.preference] || 'system'
}
</script>
