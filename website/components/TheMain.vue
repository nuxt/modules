<template>
  <div class="pb-16 relative bg-gray-100 dark:bg-secondary-black nuxt-text-default">
    <div
      class="relative bg-white shadow dark:bg-secondary-darkest w-full sticky top-0 z-50 bg-opacity-80 backdrop-filter backdrop-blur-[12px] border-none"
    >
      <TheSearch ref="searchEl" :search="q" @update:search="v=>q=v" />
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
            :maintainers-total="state.maintainersTotal"
            :downloads-total="state.downloadsTotal"
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
          :items="VERSIONS"
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

<script setup lang="ts">
import LazyHydrate from 'vue-lazy-hydration'
import Fuse from 'fuse.js/dist/fuse.basic.esm'
import { isMobile } from '~/utils/detectUserAgent'
import { CATEGORIES_ICONS, MODULE_INCREMENT_LOADING, VERSIONS } from '~/composables/constants'
import type { ModulesData } from '~/composables/fetch'

const sort = (a:number, b:number, asc?:boolean) => asc ? a - b : b - a

const props = defineProps<{
  state: ModulesData
}>()

const vm = getCurrentInstance()
const route = vm.proxy.$route
const searchEl = ref()

const q = ref('')
const orderBy = ref('downloads')
const sortBy = ref('desc')
const selectedVersion = ref<string | null>()
const selectedCategory = ref<string | null>()
const moduleLoaded = ref(MODULE_INCREMENT_LOADING)

const displayFiltersBlock = computed(() => {
  return selectedCategory.value || q.value || selectedVersion.value
})

const nbFiltersApplied = computed(() => {
  let nbFilters = 0

  if (selectedCategory.value) { nbFilters++ }
  if (selectedVersion.value) { nbFilters++ }
  if (q.value) { nbFilters++ }

  return nbFilters
})

const categoriesList = computed(() => {
  const categoriesList = []
  for (const [key, icon] of Object.entries(CATEGORIES_ICONS)) {
    categoriesList.push({
      key,
      icon,
      label: key
    })
  }

  return categoriesList
})

const filteredModules = computed(() => {
  let modules = props.state.modules
  if (q.value) {
    modules = fuse.value.search(q.value).map(r => r.item)
  } else {
    // Sort only if no search
    modules.sort((a, b) => sort(a[orderBy.value], b[orderBy.value], sortBy.value === 'asc'))
  }
  if (selectedCategory.value) {
    modules = modules.filter(module => module.category === selectedCategory.value)
  }
  if (selectedVersion.value) {
    modules = modules.filter(module => module.compatibility[selectedVersion.value] === 'working')
  }
  return modules
})

const pageFilteredModules = computed(() => {
  return Object.assign([], filteredModules.value).splice(0, moduleLoaded.value)
})

watch([q, orderBy, sortBy, selectedVersion, selectedCategory], syncURL, { deep: true })
watch(() => vm.proxy.$route, applyURLFilters)

const fuse = ref<Fuse>()

onMounted(() => {
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
  const index = Fuse.createIndex(fuseOptions.keys, props.state.modules)
  fuse.value = new Fuse(props.state.modules, fuseOptions, index)

  applyURLFilters()

  // In case of desktop, auto focus the search input
  if (!isMobile()) {
    focusSearchInput()
  }
})

useEventListener('keypress', searchFocusListener)

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

  let query = ''

  resetModuleLoaded()

  if (q.value) {
    query += `?q=${q.value}`
  }

  if (orderBy.value !== 'downloads') {
    query += `${query ? '&' : '?'}orderBy=${orderBy.value}`
  }

  if (sortBy.value !== 'desc') {
    query += `${query ? '&' : '?'}sortBy=${sortBy.value}`
  }

  if (selectedCategory.value) {
    query += `${query ? '&' : '?'}category=${selectedCategory.value}`
  }

  if (selectedVersion.value) {
    query += `${query ? '&' : '?'}version=${selectedVersion.value}`
  }

  window.history.pushState('', '', `${url}${query}`)
}

function applyURLFilters () {
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
function searchFocusListener (event) {
  // Add `/` shortcut for search input only if not already focused
  if (event.keyCode === 47 && !(event.target instanceof HTMLInputElement)) {
    event.preventDefault()
    focusSearchInput()
  }
}

function focusSearchInput () {
  searchEl.value?.$refs.searchModuleInput?.focus()
}
</script>
