<template>
  <div class="pb-16 relative dark:text-white dark:bg-secondary-black">
    <div
      class="bg-white dark:bg-secondary-black  w-full sticky top-0 z-50 bg-opacity-80 backdrop-filter backdrop-blur-[12px] border-none"
    >
      <TheSearch>
        <div class="flex shadow-sm w-full max-w-md">
          <label class="relative flex-1">
            <input
              ref="searchModule"
              v-model="q"
              type="search"
              aria-label="Search"
              class="block bg-secondary-dark w-full py-2 px-3 text-base leading-6 placeholder-gray-500 transition duration-150 ease-in-out border-2 appearance-none md:pr-10 border-sky-light rounded-lg focus:ring-3 focus:ring-sky-lighter focus:ring-opacity-50 focus:outline-none focus:placeholder-gray-400 sm:flex-1"
              placeholder="Search a module (name, category, username, etc.)"
            >
            <span
              class="absolute hidden px-2 py-1 text-gray-400 border border-sky-light rounded-md opacity-50 md:inline-block text-md top-1 right-2 leading-6"
            >/</span>
          </label>
        </div>
      </TheSearch>
    </div>

    <div
      class="pt-10 lg:pt-24 pb-16 lg:pb-32 bg-gray-100 dark:bg-secondary-darkest dark:bg-secondary-darkest sm:p-10 relative"
    >
      <div class="container mx-auto flex flex-col sm:flex-row justify-between">
        <div class="flex items-end justify-between w-full">
          <!-- Header -->
          <TheHeader />
          <!-- Stats -->
          <TheStats
            :modules="modules"
            :maintainers-total="maintainersTotal"
            :downloads-total="downloadsTotal"
          />
        </div>
        <!-- TODO: maybe card delete -->
        <div v-if="false" class="flex justify-center">
          <CardMockup class="h-full transform scale-125" />
        </div>
      </div>
      <img
        loading="lazy"
        src="/img/page-hero/dark/mountains.svg"
        alt="A landscape image"
        class="absolute -bottom-1px left-0 w-full h-12 md:h-24 object-fill light:invert light:brightness-0 light:filter pointer-events-none z-0"
      />    </div>

    <!-- Body -->
    <div class="container px-4 sm:px-0 mx-auto pt-8 grid grid-cols-1 sm:grid-cols-5 gap-8">
      <!-- Sidebar -->
      <div class="col-span-1 space-y-10 hidden lg:block">
        <!-- Nuxt versions -->
        <div>
          <h2 class="text-2xl font-extrabold tracking-tight text-sky-darkest dark:text-sky-lightest">
            Nuxt version
          </h2>
          <p class="text-sm text-gray-500 mb-4">
            Show modules working with:
          </p>
          <div class="space-y-3">
            <div>
              <button
                class="flex items-center justify-between text-sm py-2 bg-gray-100 dark:bg-secondary-darkest rounded-lg px-2 w-full"
              >
                <div>
                  <iconNuxt3
                    class="h-6 w-6 mr-2 inline-block"
                  />
                  Nuxt 3
                </div>
                <span class="text-xl px-2">-</span>
              </button>
              <div class="pt-2 ml-4">
                <div
                  class="space-y-6 py-2 text-sm bg-gray-100 dark:bg-secondary-darkest border-l-4 border-primary-700 px-2"
                >
                  - 🚧 Working
                </div>
              </div>
            </div>
            <NLink
              :to="`/?q=2.x-bridge`"
              class="flex items-center justify-between text-sm py-2 bg-gray-100 dark:bg-secondary-darkest rounded-lg px-2"
            >
              <div>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  class="h-6 w-6 mr-2 inline-block"
                >
                  <g
                    class="icon-tabler"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M6 5v14" />
                    <path d="M18 5v14" />
                    <path d="M2 15h20" />
                    <path d="M3 8a7.5 7.5 0 0 0 3-2a6.5 6.5 0 0 0 12 0a7.5 7.5 0 0 0 3 2" />
                    <path d="M12 10v5" />
                  </g>
                </svg>
                Nuxt 2.x-bridge
              </div>
              <span class="text-xl px-2">+</span>
            </NLink>
            <NLink
              :to="`/?q=2.x`"
              class="flex items-center justify-between text-sm py-2 bg-gray-100 dark:bg-secondary-darkest rounded-lg px-2"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  class="h-6 w-6 mr-2 inline-block"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M26.297 27.031l.031-.063a.746.746 0 0 0 .073-.156v-.005c.099-.26.12-.536.073-.813v.01a2.368 2.368 0 0 0-.313-.828l.01.01l-7.094-12.474l-1.083-1.891l-8.156 14.365c-.141.25-.229.521-.276.802v.016c-.057.323-.021.651.109.953l-.005-.01c.016.047.042.089.068.135l-.005-.005c.214.365.667.802 1.667.802h13.198c.208 0 1.234-.042 1.708-.849zm-8.302-12.422l6.479 11.396H11.521zm13.666 10.579L22.307 8.709c-.099-.177-.635-1.052-1.578-1.052c-.422 0-1.026.182-1.521 1.047L18 10.824l1.073 1.896l1.667-2.953l9.255 16.245h-3.521c.047.271.021.547-.073.807v-.01c-.021.057-.042.115-.073.167v-.005l-.031.063c-.474.807-1.495.849-1.693.849h5.505c.203 0 1.219-.042 1.693-.849c.214-.37.359-.984-.141-1.844zM9.74 27.078l-.063-.125v-.005a1.668 1.668 0 0 1-.115-.953v.01H1.999l11.24-19.776l3.687 6.484l1.073-1.891l-3.219-5.667c-.089-.161-.63-1.036-1.568-1.036c-.422 0-1.031.182-1.521 1.052L.306 25.187c-.099.172-.568 1.078-.099 1.885c.214.37.667.802 1.667.802h9.531c-.99 0-1.453-.427-1.667-.802z"
                    fill="currentColor"
                  />
                </svg>
                Nuxt 2.x
              </div>
              <span class="text-xl px-2">+</span>
            </NLink>
          </div>
        </div>

        <!-- Categories -->
        <div>
          <h2 class="text-2xl font-extrabold tracking-tight text-sky-darkest dark:text-sky-lightest">
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
                  : 'text-sky-darkest bg-gray-100 dark:bg-secondary-darkest dark:text-sky-surface hover:text-sky-lightest hover:bg-sky-dark focus:bg-sky-lightest',
              ]"
              @click="toggleCategory(category)"
            >
              {{ category }}
              <span class="flex items-center w-5 h-5 items-center">
                <img
                  :src="`categories/${category == 'Date' ? 'time' : category}.svg`"
                  aria-hidden="true"
                >
              </span>
            </button>
          </div>
        </div>
      </div>
      <!-- Main -->
      <div class="col-span-4">
        <!-- Clear filters -->
        <div
          class="flex flex-col items-top justify-between sm:flex-row py-5 mb-4 bg-gray-100 dark:bg-secondary-darkest px-4 rounded-lg"
        >
          <p class="text-forest-night">
            <span class="font-black text-2xl">{{ filteredModules.length }}</span>

            module{{ filteredModules.length !== 1 ? 's' : '' }} found
            <template
              v-if="selectedCategory || q"
            >
              <p>
                Filter{{ selectedCategory && q ? 's' : '' }}:
                <b>{{ selectedCategory }}</b>
                {{ selectedCategory && q ? ', ' : '' }}
                <b
                  class="font-black text-lg"
                >{{ q }}</b>
                <a
                  href="/"
                  class="hover:text-grey-darkest text-rose-600"
                  @click.prevent="clearFilters"
                >
                  (
                  <u>clear filter{{ selectedCategory && q ? 's' : '' }}</u>)
                </a>
              </p>
            </template>
          </p>
          <div class="pt-10 sm:pt-0">
            <div v-show="!q" class="flex items-center text-forest-night">
              <label
                for="options-menu"
                class="mr-3"
                @click="sortByMenuVisible = !sortByMenuVisible"
              >Sort by</label>
              <div class="relative w-28">
                <button
                  type="button"
                  :aria-label="`change sort`"
                  class="flex items-center justify-center w-full p-1 px-2 border rounded-l-md hover:bg-skborder-sky-lightest focus:bg-skborder-sky-lightest focus:outline-none hover:border-grey-light"
                  :class="sortByBtnClass"
                  @click="sortByMenuVisible = !sortByMenuVisible"
                >
                  {{ sortByComp.label }}
                </button>
                <div
                  v-show="sortByMenuVisible"
                  class="absolute right-0 z-10 origin-top-right rounded-md shadow-lg"
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
                      class="flex items-center justify-center p-1 px-2 bg-white shadow-xs w-28 hover:bg-cloudy-grey focus:text-grey-darkest text-forest-night focus:outline-none rounded-b-md"
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
                  class="flex items-center p-2 border border-l-0 hover:bg-skborder-sky-lightest focus:bg-skborder-sky-lightest focus:outline-none rounded-r-md"
                  @click="toggleOrderBy"
                >
                  <icon-order-by :is-asc="orderBy === 'asc'" class="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- This example requires Tailwind CSS v2.0+ -->

        <span
          class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"
        >Working</span>
        <span
          class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
        >Unknown</span>
        <span
          class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-secondary-darkest text-gray-800"
        >Work in progress</span>

        <div class="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-4">
          <div
            v-for="module of pageFilteredModules"
            :key="module.name"
            class="relative flex flex-col group overflow-hidden transition-transform duration-150 ease-in-out transform bg-white rounded-lg border hover:border-1 border-gray-200 hover:border-primary-600 focus:bg-sky-lightest"
          >
            <LazyHydrate when-visible>
              <card-module :module="module" />
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
        el.focus()
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
      moduleLoaded: MODULE_INCREMENT_LOADING
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

      if (this.orderBy !== FIELDS.DESC) {
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
      this.$refs.searchModule.focus()
    }
  }
}
</script>
