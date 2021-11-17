<template>
  <div class="pb-16 relative bg-gray-100 dark:text-white dark:bg-secondary-black">
    <div
      class="relative bg-gray-100 shadow dark:bg-secondary-darkest w-full sticky top-0 z-50 bg-opacity-80 backdrop-filter backdrop-blur-[12px] border-none"
    >
      <TheSearch>
        <div class="flex shadow-sm w-full max-w-xl">
          <label class="relative flex-1">
            <input
              ref="searchModule"
              v-model="q"
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
      </TheSearch>
    </div>
    <div
      class="pt-10 lg:pt-24 pb-16 lg:pb-32 bg-white dark:bg-secondary-darkest dark:bg-secondary-darkest sm:p-10 relative"
    >
      <div class="container mx-auto flex flex-col sm:flex-row justify-between">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between w-full">
          <!-- Header -->
          <TheHeader />
          <!-- Stats -->
          <TheStats
            :modules="modules"
            :maintainers-total="maintainersTotal"
            :downloads-total="downloadsTotal"
          />
        </div>
      </div>
      <img
        loading="lazy"
        src="/img/page-hero/dark/mountains.svg"
        alt="A landscape image"
        class="absolute -bottom-1px left-0 w-full h-12 md:h-24 object-fill dark:hidden text-blue-600 pointer-events-none z-0"
      >
      <img
        loading="lazy"
        src="/img/page-hero/dark/dark_mountains.svg"
        alt="A landscape image"
        class="absolute -bottom-1px left-0 w-full h-12 md:h-24 object-fill light:hidden text-blue-600 pointer-events-none z-0"
      >
    </div>

    <!-- Body -->
    <div class="container px-4 mx-auto pt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
      <!-- Sidebar -->
      <div class="col-span-1 space-y-10 hidden lg:block">
        <!-- Nuxt versions -->
        <div>
          <h2
            class="text-2xl font-extrabold tracking-tight text-sky-darkest dark:text-sky-lightest"
          >
            Nuxt version
          </h2>
          <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Show modules working with:
          </p>
          <div class="flex flex-col space-y-3">
            <NLink v-for="version in versionsMap" :key="version.label" :to="`/?q=${version.to}`">
              <button
                class="flex items-center justify-between outline-none focus:outline-none focus:text-white focus:bg-sky-darkest dark:focus:border-sky-light hover:text-sky-lightest hover:bg-sky-darker text-sm py-2 bg-white border border-gray-300 dark:border-sky-dark dark:bg-secondary-darkest rounded-lg px-4 w-full text-left"
              >
                <div>
                  <component :is="version.icon" class="h-6 w-6 mr-2 inline-block" />
                  {{ version.label }}
                </div>
                <span v-if="false" class="text-xl px-2">+</span>
              </button>
            </NLink>
          </div>
        </div>

        <!-- Categories -->
        <div>
          <h2
            class="text-2xl font-extrabold tracking-tight text-sky-darkest dark:text-sky-lightest"
          >
            Categories
          </h2>
          <div
            class="grid grid-cols-1 gap-x-4 gap-y-2 py-6 overflow-x-auto sm:flex-wrap sm:justify-center"
          >
            <button
              v-for="category of categories"
              :key="category"
              type="button"
              :aria-label="category"
              class="px-4 py-3 mb-2 text-sm text-left flex items-center justify-between rounded-lg cursor-pointer focus:outline-none"
              :class="[
                selectedCategory === category
                  ? 'bg-sky-darker text-sky-lightest'
                  : 'text-sky-darkest bg-white border border-gray-300 dark:border-sky-dark dark:bg-secondary-darkest dark:text-sky-surface hover:text-sky-lightest hover:bg-sky-dark transition-colors duration-150 ease-in-out focus:bg-sky-lightest',
              ]"
              @click="toggleCategory(category)"
            >
              <UnoIcon
                class="text-lg"
                :class="CATEGORIES_ICONS[category]"
              />
              <span class="flex-auto ml-3">{{ category }}</span>
            </button>
          </div>
        </div>
      </div>
      <!-- Main -->
      <div class="col-span-4">
        <!-- Filter -->
        <div class="h-10 -mt-5 flex items-center gap-4">
          <template
            v-if="selectedCategory || q"
          >
            <div>
              Filter{{ selectedCategory && q ? 's' : '' }}:
              <b>{{ selectedCategory }}</b>
              {{ selectedCategory && q ? ', ' : '' }}
              <b
                class="font-black text-lg"
              >{{ q }}</b>
            </div>
            <a
              href="/"
              class="ml-2 opacity-70 hover:opacity-100 inline-flex items-center gap-1"
              @click.prevent="clearFilters"
            >
              <UnoIcon class="i-carbon-filter-remove" />
              Clear filter{{ selectedCategory && q ? 's' : '' }}
            </a>
          </template>
        </div>

        <!-- Result, Sort -->
        <div class="flex flex-col items-center justify-between min-h-18 sm:flex-row p-5 mb-4 bg-white border border-gray-300 dark:border-sky-dark dark:bg-secondary-darkest rounded-lg">
          <div>
            <span class="font-black text-2xl">{{ filteredModules.length }}</span>
            module{{ filteredModules.length > 1 ? 's' : '' }} found
          </div>
          <div>
            <div v-show="!q" class="flex items-center text-forest-night">
              <label
                for="options-menu"
                class="mr-3"
                @click="sortByMenuVisible = !sortByMenuVisible"
              >Sort by</label>
              <div class="flex border border-gray-400/20 rounded-md">
                <div class="relative w-28 my-auto">
                  <button
                    type="button"
                    :aria-label="`change sort`"
                    class="flex items-center justify-center w-full p-1 px-2 hover:bg-skborder-sky-lightest focus:bg-skborder-sky-lightest focus:outline-none hover:border-grey-light"
                    :class="sortByBtnClass"
                    @click="sortByMenuVisible = !sortByMenuVisible"
                  >
                    {{ sortByComp.label }}
                  </button>
                  <div
                    v-show="sortByMenuVisible"
                    class="absolute left-0 z-10 origin-top-right rounded-b-md shadow-lg border border-gray-400/20 shadow-xs bg-white dark:bg-secondary-darkest"
                  >
                    <div
                      id="options-menu"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <button
                        v-for="(option, key) in sortByOptions"
                        :key="key"
                        type="button"
                        :aria-label="`sort by ${key}`"
                        class="flex items-center justify-center p-1 px-2 w-28 hover:bg-cloudy-grey focus:text-grey-darkest text-forest-night focus:outline-none rounded-b-md"
                        @click="selectSortBy(key)"
                      >
                        {{ option.label }}
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <button
                    type="button"
                    :aria-label="orderBy === 'asc' ? 'sort ascending' : 'sort descending'"
                    class="flex items-center p-2 hover:bg-skborder-sky-lightest focus:bg-skborder-sky-lightest focus:outline-none rounded-r-md"
                    @click="toggleOrderBy"
                  >
                    <UnoIcon :class="orderBy === 'asc' ? 'i-carbon-sort-ascending' : 'i-carbon-sort-descending'" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid gap-x-6 gap-y-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-10">
          <div
            v-for="mod of pageFilteredModules"
            :key="mod.name"
            class="relative flex flex-col group transition-transform duration-150 ease-in-out transform bg-white dark:bg-secondary-darkest rounded-lg border hover:border-1 border-gray-200 dark:border-secondary-dark hover:border-primary-800 dark:hover:border-secondary focus:bg-sky-lightest"
          >
            <LazyHydrate when-visible>
              <card-module :mod="mod" />
            </LazyHydrate>
          </div>
          <Observer @intersect="intersectedModulesLoading" />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <TheFooter />
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
import Fuse from 'fuse.js/dist/fuse.basic.esm'
import CardModule from '~/components/CardModule.vue'
import Observer from '~/components/Observer.vue'
import { isMobile } from '~/utils/detectUserAgent.ts'
import { CATEGORIES_ICONS } from '~/composables/constants'

const sort = (a, b, asc) => asc ? a - b : b - a

const ORDERS = {
  DESC: 'desc',
  ASC: 'asc'
}

const FIELDS = {
  DOWNLOADS: 'downloads',
  STARS: 'stars'
}

const sortFields = {
  [FIELDS.DOWNLOADS]: {
    label: 'Downloads'
  },
  [FIELDS.STARS]: {
    label: 'Stars'
  }
}

const MODULE_INCREMENT_LOADING = 12

export default {
  components: { LazyHydrate, CardModule, Observer },
  directives: {
    focus: {
      // directive definition
      inserted (el) {
        el?.focus()
      }
    }
  },
  async asyncData () {
    const { modules } = await $fetch('/api/modules')
    const { categories } = await $fetch('/api/categories')

    const maintainers = []
    let downloadsTotal = 0
    modules.forEach((module) => {
      downloadsTotal += (module.downloads || 0)
      module.maintainers.forEach((maintainer) => {
        if (!maintainers.find(m => m.name === maintainer.name)) {
          maintainers.push(maintainer)
        }
      })
    })

    for (const module of modules) {
      module.tags = [
        ...(module.tags || []),
        ...Object.entries(module.compatibility)
          .map(([version, status]) => status === 'working' ? version : false)
          .filter(Boolean)
      ]
    }

    return {
      modules,
      categories,
      maintainersTotal: maintainers.length,
      downloadsTotal
    }
  },
  data () {
    return {
      q: '',
      orderBy: ORDERS.DESC,
      sortBy: 'downloads',
      sortByMenuVisible: false,
      selectedCategory: null,
      moduleLoaded: MODULE_INCREMENT_LOADING,
      CATEGORIES_ICONS
    }
  },
  head () {
    const title = 'Explore Nuxt Modules'
    const description = 'Discover our list of modules to supercharge your Nuxt project. Created by the Nuxt team and community.'
    const url = 'https://modules.nuxtjs.org'

    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:site_name', property: 'og:site_name', content: title },
        { hid: 'og:description', property: 'og:description', content: description },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:url', property: 'og:url', content: url },
        { hid: 'og:image', property: 'og:image', content: `${url}/preview.png` },
        // Twitter Card
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:site', name: 'twitter:site', content: '@nuxt_js' },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        { hid: 'twitter:image', name: 'twitter:image', content: `${url}/preview.png` },
        { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: title }
      ]
    }
  },
  computed: {
    versionsMap () {
      return {
        '3.x': {
          label: 'Nuxt 3.x',
          id: 'three',
          icon: 'iconNuxt3',
          to: '3.x'
        },
        '2.x-bridge': {
          label: 'Nuxt 2.x Bridge',
          id: 'bridge',
          icon: 'iconNuxtBridge',
          to: '2.x-bridge'
        },
        '2.x': {
          label: 'Nuxt 2.x',
          id: 'two',
          icon: 'iconNuxt2',
          to: '2.x'
        }
      }
    },
    filteredModules () {
      let modules = this.modules
      if (this.q) {
        modules = this.fuse.search(this.q).map(r => r.item)
      } else {
        // Sort only if no search
        modules.sort((a, b) => sort(a[this.sortBy], b[this.sortBy], this.orderBy === ORDERS.ASC))
      }
      if (this.selectedCategory) {
        modules = modules.filter(module => module.category === this.selectedCategory)
      }

      return modules
    },
    pageFilteredModules () {
      const filteredModules = Object.assign([], this.filteredModules)
      return filteredModules.splice(0, this.moduleLoaded)
    },
    sortByComp () {
      return sortFields[this.sortBy]
    },
    sortByOptions () {
      const options = {}

      for (const key in sortFields) {
        if (key === this.sortBy) { continue }

        options[key] = {
          ...sortFields[key]
        }
      }

      return options
    },
    sortByBtnClass () {
      return this.sortByMenuVisible ? 'rounded-bl-none border-b-grey-light' : ''
    }
  },
  watch: {
    selectedCategory () {
      this.syncURL()
    },
    q () {
      this.syncURL()
    },
    orderBy () {
      this.syncURL()
    },
    sortBy () {
      this.syncURL()
    },
    $route () {
      this.applyURLFilters()
    }
  },
  mounted () {
    const fuseOptions = {
      threshold: 0.1,
      keys: [
        'name',
        'npm',
        'category',
        'maintainers.name',
        'maintainers.github',
        'description',
        'repo',
        'tags'
      ]
    }
    const index = Fuse.createIndex(fuseOptions.keys, this.modules)
    this.fuse = new Fuse(this.modules, fuseOptions, index)

    this.applyURLFilters()

    // In case of desktop, auto focus the search input
    if (!isMobile()) {
      this.focusSearchInput()
    }
  },
  beforeMount () {
    window.addEventListener('keypress', this.searchFocusListener)
  },
  beforeDestroy () {
    window.removeEventListener('keypress', this.searchFocusListener)
  },
  methods: {
    toggleCategory (category) {
      if (this.selectedCategory === category) {
        this.selectedCategory = null
        return
      }
      this.selectedCategory = category
    },
    clearFilters () {
      this.selectedCategory = null
      this.q = null
      this.moduleLoaded = MODULE_INCREMENT_LOADING
    },
    syncURL () {
      const url = this.$route.path
      let query = ''
      this.resetModuleLoaded()

      if (this.q) {
        query += `?q=${this.q}`
      }

      if (this.orderBy !== ORDERS.DESC) {
        query += `${query ? '&' : '?'}orderBy=${this.orderBy}`
      }

      if (this.sortBy !== FIELDS.DOWNLOADS) {
        query += `${query ? '&' : '?'}sortBy=${this.sortBy}`
      }

      if (this.selectedCategory) {
        query += `#${this.selectedCategory}`
      }

      window.history.pushState('', '', `${url}${query}`)
    },
    applyURLFilters () {
      const selectedCategory = (window.location.hash || '').substr(1)
      if (selectedCategory) {
        this.toggleCategory(selectedCategory)
      }
      const { q, sortBy, orderBy } = this.$route.query
      if (q) {
        this.q = q
      }

      if (sortBy) {
        this.sortBy = sortBy
      }

      if (orderBy) {
        this.orderBy = orderBy
      }
    },
    toggleOrderBy () {
      this.orderBy = (this.orderBy === ORDERS.ASC) ? ORDERS.DESC : ORDERS.ASC
    },
    selectSortBy (field) {
      this.sortBy = field
      this.sortByMenuVisible = false
    },
    intersectedModulesLoading () {
      this.moduleLoaded += MODULE_INCREMENT_LOADING
    },
    resetModuleLoaded () {
      this.moduleLoaded = MODULE_INCREMENT_LOADING
    },
    searchFocusListener (event) {
      // Add `/` shortcut for search input only if not already focused
      if (event.keyCode === 47 && !(event.target instanceof HTMLInputElement)) {
        event.preventDefault()
        this.focusSearchInput()
      }
    },
    focusSearchInput () {
      this.$refs.searchModule?.focus()
    }
  }
}
</script>
