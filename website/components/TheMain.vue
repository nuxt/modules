<template>
  <div class="pb-16 relative bg-gray-100 dark:bg-secondary-black nuxt-text-default">
    <div
      class="relative bg-white shadow dark:bg-secondary-darkest w-full sticky top-0 z-50 bg-opacity-80 backdrop-filter backdrop-blur-[12px] border-none"
    >
      <TheNav ref="searchEl" :search="q" @update:search="v=>q=v">
        <template #head>
          <button
            v-show="!lg"
            aria-label="Toggle Drawer"
            class="!outline-none text-xl h-1.2em my-auto"
            @click="isDrawerOpen = true"
          >
            <UnoIcon class="i-carbon-menu" />
          </button>
        </template>
      </TheNav>
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
            :modules="state.modules"
            :stats="state.stats"
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
    <div class="w-full max-w-390 px-4 mx-auto pt-8 grid grid-cols-1 lg:grid-cols-[18em,1fr] gap-4">
      <!-- Sidebar -->
      <TheDrawer
        :enabled="!lg"
        :open="isDrawerOpen"
        :drawer-class="'bg-gray-100 dark:bg-secondary-black p-4 w-20em border-r nuxt-border h-full overflow-auto'"
        @close="isDrawerOpen=false"
      >
        <div class="p-4 relative">
          <button
            v-show="!lg"
            aria-label="Close Drawer"
            class="absolute top-0 right-0 !outline-none text-2xl"
            @click="isDrawerOpen = false"
          >
            <UnoIcon class="i-carbon-close" />
          </button>
          <!-- Nuxt versions -->
          <FilterButtons
            title="Nuxt version"
            subtitle="Show modules working with:"
            :items="VERSIONS"
            :selected-item="selectedVersion"
            @toggle="toggleVersion"
          >
            <template #icon="{ icon }">
              <component :is="icon" class="h-6 w-6 flex-none inline-block" />
            </template>
            <template #badge="{ key }">
              <div v-if="key!=='2.x'" class="text-green-600 dark:text-green-400 border border-current bg-green-500/10 px-1.5 text-xs rounded-full">
                Beta
              </div>
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
      </TheDrawer>
      <!-- Main -->
      <div>
        <!-- Filter -->
        <div class="h-10 -mt-5 mb-2 flex items-center gap-1">
          <template
            v-if="displayFiltersBlock"
          >
            <div>Filter{{ filtersCount > 1 ? 's' : '' }}</div>
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
              Clear filter{{ filtersCount > 1 ? 's' : '' }}
            </a>
          </template>
        </div>

        <!-- Result, Sort -->
        <div class="flex flex-col items-center justify-between min-h-18 sm:flex-row p-5 mb-4 border nuxt-border nuxt-card-bg rounded-lg">
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
          style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))"
        >
          <template v-for="mod of pageFilteredModules" :key="mod.name">
            <!-- <LazyHydrate :key="mod.name" when-visible> -->
            <CardModule :mod="mod" />
            <!-- </LazyHydrate> -->
          </template>
          <Observer @intersect="intersectedModulesLoading" />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
// import LazyHydrate from 'vue-lazy-hydration'
import Fuse from 'fuse.js/dist/fuse.basic.esm'
import { breakpointsTailwind } from '@vueuse/core'
import { CATEGORIES_ICONS, MODULE_INCREMENT_LOADING, VERSIONS } from '~/composables/constants'
import type { ModulesData } from '~/composables/fetch'

const sort = (a:number, b:number, asc?:boolean) => asc ? a - b : b - a

const props = defineProps<{
  state: ModulesData
}>()

const vm = getCurrentInstance()
const searchEl = ref()

const { md, lg } = useBreakpoints(breakpointsTailwind)

const isDrawerOpen = ref(false)
const q = ref('')
const orderBy = ref('downloads')
const sortBy = ref('desc')
const selectedVersion = ref<string | null>()
const selectedCategory = ref<string | null>()
const moduleLoaded = ref(MODULE_INCREMENT_LOADING)
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
const fuseIndex = Fuse.createIndex(fuseOptions.keys, props.state.modules)
const fuse = new Fuse(props.state.modules, fuseOptions, fuseIndex)

const displayFiltersBlock = computed(() => selectedCategory.value || q.value || selectedVersion.value)

const filtersCount = computed(() => {
  let count = 0
  if (selectedCategory.value) { count++ }
  if (selectedVersion.value) { count++ }
  if (q.value) { count++ }
  return count
})

const categoriesList = computed(() => {
  return Object
    .entries(CATEGORIES_ICONS)
    .map(([key, icon]) => ({ key, icon, label: key }))
})

const filteredModules = computed(() => {
  let modules = props.state.modules
  if (q.value) {
    modules = fuse.search(q.value).map(r => r.item)
  } else {
    // Sort only if no search
    modules.sort((a, b) => sort(a[orderBy.value], b[orderBy.value], sortBy.value === 'asc'))
  }
  if (selectedCategory.value) {
    modules = modules.filter(module => module.category === selectedCategory.value)
  }
  if (selectedVersion.value) {
    modules = modules.filter(module => module.tags.includes(selectedVersion.value))
  }
  return modules
})

const pageFilteredModules = computed(() => {
  return Array.from(filteredModules.value).splice(0, moduleLoaded.value)
})

watch([q, orderBy, sortBy, selectedVersion, selectedCategory], syncURL, { deep: true })
watch(() => vm.proxy.$route, applyURLFilters)

function getVersionFromKey (key: string) {
  const version = VERSIONS.find(version => version.key === key)
  return version
}

function toggleCategory (category) {
  if (selectedCategory.value === category) {
    selectedCategory.value = null
    return
  }
  selectedCategory.value = category
}

function toggleVersion (version) {
  if (selectedVersion.value === version) {
    selectedVersion.value = null
    return
  }
  selectedVersion.value = version
}

function clearFilters () {
  selectedCategory.value = null
  selectedVersion.value = null
  q.value = null
  moduleLoaded.value = MODULE_INCREMENT_LOADING
}

function syncURL () {
  const url = vm.proxy.$route.path
  const queries = []

  resetModuleLoaded()

  if (q.value) {
    queries.push(`q=${q.value}`)
  }
  if (orderBy.value !== 'downloads') {
    queries.push(`orderBy=${orderBy.value}`)
  }
  if (sortBy.value !== 'desc') {
    queries.push(`sortBy=${sortBy.value}`)
  }
  if (selectedCategory.value) {
    queries.push(`category=${selectedCategory.value}`)
  }
  if (selectedVersion.value) {
    queries.push(`version=${selectedVersion.value}`)
  }
  let query = queries.join('&')
  if (query) { query = '?' + query }

  window.history.pushState('', '', `${url}${query}`)
}

function applyURLFilters () {
  const route = vm.proxy.$route
  if (typeof route.query.q === 'string') {
    q.value = route.query.q
  }
  if (typeof route.query.sortBy === 'string') {
    sortBy.value = route.query.sortBy
  }
  if (typeof route.query.orderBy === 'string') {
    orderBy.value = route.query.orderBy
  }
  if (route.query.category) {
    toggleCategory(route.query.category)
  }
  if (route.query.version) {
    toggleVersion(route.query.version)
  }
}

function intersectedModulesLoading () {
  moduleLoaded.value += MODULE_INCREMENT_LOADING
}
function resetModuleLoaded () {
  moduleLoaded.value = MODULE_INCREMENT_LOADING
}

onMounted(() => {
  applyURLFilters()
})
</script>
