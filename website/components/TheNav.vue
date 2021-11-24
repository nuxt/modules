<template>
  <div class="flex items-center gap-4 justify-between w-full container mx-auto px-4 py-2 h-14">
    <slot name="head" />
    <div class="flex" :class="isSearchOpen ? 'hidden': ''">
      <a href="/" class="inline-flex text-2xl">
        <IconNuxtLogo alt="Nuxt" width="40" height="40" />
        <span class="my-auto ml-1 pt-0.5">
          Modules
        </span>
      </a>
    </div>
    <div class="flex shadow-sm w-full max-w-xl flex-auto">
      <label class="relative flex-1" :class="isSearchOpen ? 'flex' : 'hidden md:flex'">
        <input
          ref="searchEl"
          v-model="searchModel"
          type="search"
          aria-label="Search"
          class="block bg-gray-200/40 dark:bg-secondary-dark/50 w-full py-1 px-3 h-10 text-base leading-6 placeholder-gray-400 dark:placeholder-secondary-light transition duration-150 ease-in-out appearance-none md:pr-10 rounded-lg focus:ring-3 focus:ring-sky-dark focus:ring-opacity-50 focus:outline-none focus:placeholder-sky-darkest focus:dark:placeholder-secondary-lightest sm:flex-1"
          placeholder="Search a module (name, category, username, etc.)"
        >
        <span
          class="absolute hidden px-2 text-gray opacity-50 bg-gray-200 dark:bg-secondary-dark rounded-md md:inline-block text-md top-2 bottom-2 right-2"
        >/</span>
      </label>
    </div>
    <button
      aria-label="Search"
      class="block md:hidden !outline-none text-xl h-1.2em my-auto"
      @click="toggleSearch()"
    >
      <UnoIcon class="i-carbon-search" />
    </button>
    <button aria-label="Toggle theme" class="!outline-none text-xl h-1.2em my-auto" @click="toggleDarkMode()">
      <ColorScheme placeholder="..." tag="span">
        <UnoIcon v-if="$colorMode.preference === 'system'" class="i-carbon-sun" />
        <UnoIcon v-else-if="$colorMode.value === 'dark'" class="i-carbon-moon" />
        <UnoIcon v-else class="i-carbon-sun" />
      </ColorScheme>
    </button>
    <slot name="tail" />
  </div>
</template>

<script setup lang="ts">
import { isMobile } from '~/utils/detectUserAgent'

const props = defineProps<{ search: string }>()
const emit = defineEmits<{(e: 'update:search', v: string): void }>()

const searchEl = ref<HTMLInputElement>()
const searchModel = computed<string>({
  get () {
    return props.search
  },
  set (v) {
    emit('update:search', v)
  }
})

const isSearchOpen = ref(false)

const toggleNext = {
  system: 'dark', // TODO
  dark: 'light',
  light: 'dark'
}

async function toggleSearch () {
  isSearchOpen.value = !isSearchOpen.value

  if (isSearchOpen.value) {
    await nextTick()
    focusSearchInput()
  }
}

function focusSearchInput () {
  searchEl.value?.focus()
}

const vm = getCurrentInstance().proxy
function toggleDarkMode () {
  vm.$colorMode.preference = toggleNext[vm.$colorMode.preference] || 'system'
}

onMounted(() => {
  useEventListener('keypress', (event) => {
    // Add `/` shortcut for search input only if not already focused
    if (event.key === '/' && !(event.target instanceof HTMLInputElement)) {
      event.preventDefault()
      focusSearchInput()
    }
  })

  // In case of desktop, auto focus the search input
  if (!isMobile()) {
    focusSearchInput()
  }
})
</script>
