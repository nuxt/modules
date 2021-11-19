<template>
  <div class="pb-16 relative bg-gray-100 dark:bg-secondary-black nuxt-text-default">
    <div
      class="relative bg-white shadow dark:bg-secondary-darkest w-full sticky top-0 z-50 bg-opacity-80 backdrop-filter backdrop-blur-[12px] border-none"
    >
      <TheSearch ref="theSearch" :search="q" @update:search="v=>q=v" />
    </div>
    <div
      class="pt-10 pb-16 px-3 lg:px-10 lg:pt-24 lg:pb-32 bg-white dark:bg-secondary-darkest dark:bg-secondary-darkest relative"
    >
      <div class="container mx-auto flex flex-col sm:flex-row justify-between">
        <div class="flex flex-wrap justify-between gap-y-5 w-full">
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
        <FilterButtons
          title="Nuxt version"
          subtitle="Show modules working with:"
          :items="versionsList"
          :selected-item="selectedVersion"
          @toggle="toggleVersion"
        >
          <template #icon="{ icon }">
            <component :is="icon" class="h-6 w-6 mr-2 inline-block" />
          </template>
        </FilterButtons>

        <!-- Categories -->
        <FilterButtons
          title="Categories"
          :items="categoriesList"
          :selected-item="selectedCategory"
          @toggle="toggleCategory"
        />
      </div>
      <!-- Main -->
      <div class="col-span-4">
        <!-- Filter -->
        <div class="h-10 -mt-5 flex items-center gap-1">
          <template
            v-if="displayFiltersBlock"
          >
            <div>Filter{{ nbFiltersApplied > 1 ? 's' : '' }}</div>
            <FilterLabel v-if="selectedVersion" @close="selectedVersion = null">
              {{ getVersionFromKey(selectedVersion).label }}
            </FilterLabel>
            <FilterLabel v-if="selectedCategory" @close="selectedCategory = null">
              {{ selectedCategory }}
            </FilterLabel>
            <FilterLabel v-if="q" @close="q = ''">
              {{ q }}
            </FilterLabel>
            <a
              href="/"
              class="ml-2 opacity-70 hover:opacity-100 inline-flex items-center gap-1"
              @click.prevent="clearFilters"
            >
              <UnoIcon class="i-carbon-filter-remove" />
              Clear filter{{ nbFiltersApplied > 1 ? 's' : '' }}
            </a>
          </template>
        </div>

        <!-- Result, Sort -->
        <div class="flex flex-col items-center justify-between min-h-18 sm:flex-row p-5 mb-4 nuxt-border nuxt-card-bg rounded-lg">
          <div>
            <span class="font-black text-2xl">{{ filteredModules.length }}</span>
            module{{ filteredModules.length > 1 ? 's' : '' }} found
          </div>
          <TheOrderBy
            v-show="!q"
            :order-by="orderBy"
            :sort-by="sortBy"
            @update:order-by="v=>orderBy=v"
            @update:sort-by="v=>sortBy=v"
          />
        </div>

        <div
          class="grid gap-x-6 gap-y-8 mt-10"
          style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))"
        >
          <template v-for="mod of pageFilteredModules">
            <LazyHydrate :key="mod.name" when-visible>
              <CardModule :mod="mod" />
            </LazyHydrate>
          </template>
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
import { isMobile } from '~/utils/detectUserAgent.ts'
import { CATEGORIES_ICONS, MODULE_INCREMENT_LOADING, VERSIONS } from '~/composables/constants'
import { fetchModules } from '~/composables/fetch'

const sort = (a, b, asc) => asc ? a - b : b - a

export default {
  components: { LazyHydrate },
  directives: {
    focus: {
      // directive definition
      inserted (el) {
        el?.focus()
      }
    }
  },
  async asyncData () {
    return await fetchModules()
  },
  data () {
    return {
      q: '',
      orderBy: 'downloads',
      sortBy: 'desc',
      selectedCategory: null,
      selectedVersion: null,
      moduleLoaded: MODULE_INCREMENT_LOADING,
      CATEGORIES_ICONS,
      versionsList: VERSIONS
    }
  },
  computed: {
    displayFiltersBlock () {
      return this.selectedCategory || this.q || this.selectedVersion
    },
    nbFiltersApplied () {
      let nbFilters = 0

      if (this.selectedCategory) { nbFilters++ }
      if (this.selectedVersion) { nbFilters++ }
      if (this.q) { nbFilters++ }

      return nbFilters
    },
    categoriesList () {
      const categoriesList = []
      for (const [key, icon] of Object.entries(CATEGORIES_ICONS)) {
        categoriesList.push({
          key,
          icon,
          label: key
        })
      }

      return categoriesList
    },
    filteredModules () {
      let modules = this.modules
      if (this.q) {
        modules = this.fuse.search(this.q).map(r => r.item)
      } else {
        // Sort only if no search
        modules.sort((a, b) => sort(a[this.orderBy], b[this.orderBy], this.sortBy === 'asc'))
      }
      if (this.selectedCategory) {
        modules = modules.filter(module => module.category === this.selectedCategory)
      }
      if (this.selectedVersion) {
        modules = modules.filter(module => module.compatibility[this.selectedVersion] === 'working')
      }

      return modules
    },
    pageFilteredModules () {
      const filteredModules = Object.assign([], this.filteredModules)
      return filteredModules.splice(0, this.moduleLoaded)
    }
  },
  watch: {
    selectedCategory () {
      this.syncURL()
    },
    selectedVersion () {
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
    getVersionFromKey (key) {
      const version = this.versionsList.find(version => version.key === key)

      return version ?? {}
    },
    toggleCategory (category) {
      if (this.selectedCategory === category) {
        this.selectedCategory = null
        return
      }
      this.selectedCategory = category
    },
    toggleVersion (version) {
      if (this.selectedVersion === version) {
        this.selectedVersion = null
        return
      }
      this.selectedVersion = version
    },
    clearFilters () {
      this.selectedCategory = null
      this.selectedVersion = null
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

      if (this.orderBy !== 'downloads') {
        query += `${query ? '&' : '?'}orderBy=${this.orderBy}`
      }

      if (this.sortBy !== 'desc') {
        query += `${query ? '&' : '?'}sortBy=${this.sortBy}`
      }

      if (this.selectedCategory) {
        query += `${query ? '&' : '?'}category=${this.selectedCategory}`
      }

      if (this.selectedVersion) {
        query += `${query ? '&' : '?'}version=${this.selectedVersion}`
      }

      window.history.pushState('', '', `${url}${query}`)
    },
    applyURLFilters () {
      const { q, sortBy, orderBy, category, version } = this.$route.query
      if (q) {
        this.q = q
      }

      if (sortBy) {
        this.sortBy = sortBy
      }

      if (orderBy) {
        this.orderBy = orderBy
      }

      if (category) {
        this.toggleCategory(category)
      }

      if (version) {
        this.toggleVersion(version)
      }
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
      this.$refs.theSearch?.$refs.searchModuleInput?.focus()
    },
  }
}
</script>
