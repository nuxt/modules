<template>
  <div class="pb-16">
    <div class="p-16 bg-sky-darkest sm:p-24">
      <!-- Header -->
      <TheHeader />

      <!-- Stats -->
      <TheStats
        :modules="modules"
        :maintainers-total="maintainersTotal"
        :downloads-total="downloadsTotal"
      />
    </div>

    <div class="container px-4 sm:px-0 py-10 mx-auto">
      <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">Status Tag</h2>
      <div class="grid md:grid-cols-3 gap-6 mt-6">
        <div
          v-for="c in [{ label: 'Working', icon: '✅' }, { label: 'Unknown', icon: '❓' }, { label: 'Work in progress', icon: '🚧' }]"
          :key="c.label"
        >
          <div
            class="flex items-center justify-between text-base bg-gray-100 rounded-lg w-full px-4 py-2"
          >
            <span class="py-0.5">{{ c.label }}</span>
            {{ c.icon }}
          </div>
          <span class="text-base mt-2 text-gray-500">{{ c.statusText }}</span>
        </div>
      </div>
    </div>
    <!-- Search and filters -->
    <div class="pt-12 bg-gray-100">
      <div class="container px-4 mx-auto sm:px-0">
        <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">Filters</h2>
        <!-- Categories -->
        <div class="flex py-6 space-x-2 overflow-x-auto sm:flex-wrap sm:justify-center">
          <button
            v-for="category of categories"
            :key="category"
            type="button"
            :aria-label="category"
            class="px-4 py-2 mb-2 text-sm rounded cursor-pointer focus:outline-none"
            :class="[selectedCategory === category ? 'bg-sky-darker text-sky-lightest' : 'text-sky-black bg-sky-lightest hover:text-sky-lightest hover:bg-sky-dark focus:bg-sky-lightest']"
            @click="toggleCategory(category)"
          >{{ category }}</button>
        </div>

        <!-- Search -->
        <div class="flex shadow-sm sm:max-w-lg sm:mx-auto mb-10">
          <label class="relative flex-1">
            <input
              ref="searchModule"
              v-model="q"
              type="search"
              aria-label="Search"
              class="block w-full py-3 pl-3 pr-3 text-base leading-6 placeholder-gray-500 transition duration-150 ease-in-out border-2 appearance-none md:pr-10 border-sky-lightest rounded-tl-md rounded-bl-md focus:ring-3 focus:ring-sky-lighter focus:ring-opacity-50 focus:outline-none focus:placeholder-gray-400 sm:flex-1"
              placeholder="Search a module (name, category, username, etc.)"
            />
            <span
              class="absolute hidden px-2 py-1 text-gray-400 border border-sky-lightest rounded-md opacity-50 md:inline-block text-md top-2 right-2 leading-6"
            >/</span>
          </label>
          <button
            type="button"
            aria-label="search"
            class="px-6 py-3 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-sky-lightest hover:bg-grey-light focus:bg-grey-light rounded-tr-md rounded-br-md focus:outline-none focus:ring-3 focus:ring-sky-lighter focus:ring-opacity-50 sm:mt-0 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
          >
            <IconSearch alt="Search" />
          </button>
        </div>
        <!-- Clear filters -->
        <div class="flex flex-col items-top justify-between sm:flex-row pb-10">
          <p class="text-forest-night">
            <span class="font-black text-2xl">{{ filteredModules.length }}</span>
            module{{ filteredModules.length !== 1 ? 's' : '' }} found
            (Show modules working with:
            <NLink
              v-for="v in ['2.x', '2.x-bridge', '3.x']"
              :key="v"
              class="mx-1 underline cursor-pointer text-yellow-600 font-semibold"
              :to="`/?q=${v}`"
            >{{ v }}</NLink>)
            <template v-if="selectedCategory || q">
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
                >{{ sortByComp.label }}</button>
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
                    >{{ option.label }}</button>
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
      </div>
    </div>

    <!-- Modules list -->
    <div class="container px-4 sm:px-0 mx-auto pt-8">
      <!-- Module cards -->
      <p class="text-sm font-extrabold tracking-tight text-gray-900 mt-4">Modules</p>
      <h2
        class="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-700"
      >Great codes.</h2>
      <div class="grid gap-14 md:grid-cols-2 xl:grid-cols-3 mt-6">
        <div
          v-for="module of pageFilteredModules"
          :key="module.name"
          class="relative flex flex-col group overflow-hidden transition-transform duration-150 ease-in-out transform bg-white rounded-xl border hover:border-transparent border-gray-200 hover:shadow-md hover:-translate-y-1"
        >
          <LazyHydrate when-visible>
            <card-module :module="module" />
          </LazyHydrate>
        </div>
        <Observer @intersect="intersectedModulesLoading" />
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
      inserted(el) {
        el.focus()
      }
    }
  },
  async asyncData() {
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
  data() {
    return {
      q: '',
      orderBy: ORDERS.DESC,
      sortBy: 'downloads',
      sortByMenuVisible: false,
      selectedCategory: null,
      moduleLoaded: MODULE_INCREMENT_LOADING
    }
  },
  head() {
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
    filteredModules() {
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
    pageFilteredModules() {
      const filteredModules = Object.assign([], this.filteredModules)
      return filteredModules.splice(0, this.moduleLoaded)
    },
    sortByComp() {
      return sortFields[this.sortBy]
    },
    sortByOptions() {
      const options = {}

      for (const key in sortFields) {
        if (key === this.sortBy) { continue }

        options[key] = {
          ...sortFields[key]
        }
      }

      return options
    },
    sortByBtnClass() {
      return this.sortByMenuVisible ? 'rounded-bl-none border-b-grey-light' : ''
    }
  },
  watch: {
    selectedCategory() {
      this.syncURL()
    },
    q() {
      this.syncURL()
    },
    orderBy() {
      this.syncURL()
    },
    sortBy() {
      this.syncURL()
    },
    $route() {
      this.applyURLFilters()
    }
  },
  mounted() {
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
  beforeMount() {
    window.addEventListener('keypress', this.searchFocusListener)
  },
  beforeDestroy() {
    window.removeEventListener('keypress', this.searchFocusListener)
  },
  methods: {
    toggleCategory(category) {
      if (this.selectedCategory === category) {
        this.selectedCategory = null
        return
      }
      this.selectedCategory = category
    },
    clearFilters() {
      this.selectedCategory = null
      this.q = null
      this.moduleLoaded = MODULE_INCREMENT_LOADING
    },
    syncURL() {
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
    applyURLFilters() {
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
    toggleOrderBy() {
      this.orderBy = (this.orderBy === ORDERS.ASC) ? ORDERS.DESC : ORDERS.ASC
    },
    selectSortBy(field) {
      this.sortBy = field
      this.sortByMenuVisible = false
    },
    intersectedModulesLoading() {
      this.moduleLoaded += MODULE_INCREMENT_LOADING
    },
    resetModuleLoaded() {
      this.moduleLoaded = MODULE_INCREMENT_LOADING
    },
    searchFocusListener(event) {
      // Add `/` shortcut for search input only if not already focused
      if (event.keyCode === 47 && !(event.target instanceof HTMLInputElement)) {
        event.preventDefault()
        this.focusSearchInput()
      }
    },
    focusSearchInput() {
      this.$refs.searchModule.focus()
    }
  }
}
</script>
