<template>
  <div class="pb-16 relative bg-gray-100 dark:bg-secondary-black nuxt-text-default">
    <div
      class="relative bg-white shadow dark:bg-secondary-darkest w-full sticky top-0 z-50 bg-opacity-80 backdrop-filter backdrop-blur-[12px] border-none"
    >
      <TheNav ref="searchEl" :search="q" @update:search="v=>q=v">
        <template #head>
          <button
            aria-label="Toggle Drawer"
            class="!outline-none text-xl h-1.2em my-auto block lg:hidden"
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
      <!-- Mountain -->
      <div class="text-gray-100 dark:text-secondary-black">
        <svg
          class="absolute -bottom-1px left-0 right-0 w-full pointer-events-none z-0"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 126"
        >
          <path d="M1440 30.5L1431.6 35.4L1422.7 25C1421.8 24 1420.6 23.4 1419.3 23.5L1408.9 24.1C1407.9 24.2 1406.9 24.5 1406.1 25.2L1402.7 28C1398.7 31.2 1393.8 33.1 1388.7 33.4L1379.3 33.9L1378 32.4C1374.5 28.4 1369.5 26.3 1364.4 26.6L1362.4 26.7L1350.4 20.9L1342.9 17C1340.9 16 1338.5 16.3 1336.9 17.9L1336.2 18.6C1333.8 20.9 1330.1 21 1327.6 18.8L1321.9 13.7C1321.1 13 1320.2 12.6 1319.1 12.4L1309 10.9L1303 4.90002L1302.1 4.10002C1298.6 0.800025 1293.5 2.45571e-05 1289.2 2.20002L1274.6 10.6C1272.2 12.4 1268.2 16.8 1265 20.4C1262.6 23 1260.6 25.3 1259.9 25.7C1258.7 26.5 1239.7 23.1 1227.4 20.6C1221 19.3 1213.9 20.7 1208.6 24.8L1194.6 35.7L1189.8 41.1C1186.7 44.6 1182.8 47.4 1178.6 49.2L1168.7 55.6L1163.4 59H1152.4L1143.7 55.6H1132L1096.4 21.2C1094.3 19.2 1090.9 19.4 1089.1 21.6L1073.1 41.1L1058.8 45.5L1048.2 55.6L1036.4 67.2L1028.8 75.9L1020.6 81.5L1007 93.5L986.8 106.3L979.9 121.7L963.4 126H1440" fill="currentColor" />
          <path d="M1024 125.6V121L1018.6 123.1L1010.7 121.1L1004.8 117.4H1001.2L996.2 115L993.4 112.7L988.4 110.8L981.9 115.6L978.2 112.7L974.7 111.5L970 107.3L966.7 102.9L960.5 99L954 94L941.7 84.8L926.6 94L902.8 90.8L891 84.8C888.5 84 886.2 82.7 884.3 81L881.4 78.4L873.1 73.2C870 71.2 865.8 70.7 862.2 71.6C855.2 73.2 844.4 75.5 843.7 75.2C843.3 75 842.1 73.9 840.6 72.6C838.6 70.8 836.3 68.7 834.8 67.8L826.2 63.9C823.7 62.9 820.8 63.4 818.9 65.2L818.4 65.6L815.1 68.8L809.3 69.8C808.7 69.9 808.2 70.2 807.8 70.5L804.7 73.3C803.3 74.5 801.2 74.6 799.8 73.5L799.4 73.2C798.4 72.4 797 72.3 795.9 72.9L791.7 75.1L785 78.4H783.9C780.9 78.4 778.1 79.6 776.3 81.8L775.6 82.6H770C767.1 82.6 764.2 81.8 761.8 80.2L759.7 78.9C759.2 78.6 758.6 78.4 758.1 78.4H752.1C751.4 78.4 750.6 78.7 750.2 79.3L745.4 84.9L740.4 82.6L731.3 84.9H721.6L708.1 88L693.3 81H682.4L671.6 82.7L663.9 75.5C663.7 75.3 663.4 75.2 663 75.2H655.6L647.6 70.1L637.4 67.8L628.8 62.2L615.4 56.9C611.4 55.2 606.7 55.7 603.3 58.2L603 58.4L580.7 70L572.1 75.1L558.3 77.1L550.1 75.1L549.4 74.4C548.5 73.5 546.9 73.4 545.9 74.3L543 76.9L537.5 77.2L535.8 75.9C532.4 73.2 528.1 71.8 523.7 71.8L518.5 70.1L507.5 64.1H498.6L484.8 67.8L480.1 71.7L468 73.1L464.8 78.2H444.9L437.7 75.4L427.8 65.9C426.5 64.6 424.6 64.1 422.7 64.4L415.1 67.5L406 71.4L400.8 65.8L397.7 63.4C396.7 62.6 395.1 62.7 394.2 63.7L390.8 67.5L388 73.1L380.8 76.2C379.7 76.7 378.6 77.3 377.6 78L373.4 80.9L369.1 79.8C365.1 78.8 360.8 79.6 357.5 82.1L356.7 82.7H352.8C351.7 82.7 350.7 82.8 349.6 82.9L340.6 78.8L340.3 78.6C336.7 76.2 332 75.9 328.1 77.9L315 83.9L306.7 89.9L296.7 92.7L288.9 98.2L281.5 98.6C281.2 98.6 280.9 98.8 280.6 99L277.6 102.1L264.4 105.6L262.5 105.4L251.6 105.9L240.4 112L235.4 113.3L223.7 111.2L214 111.7L204.8 109.9L200 112.4L194.9 107C194.4 106.5 193.7 106.2 192.9 106.2L186.9 106.5C186.3 106.5 185.8 106.7 185.3 107.1L183.3 108.5C181 110.2 178.2 111.1 175.2 111.3L169.8 111.6L169.1 110.8C167.1 108.7 164.2 107.6 161.3 107.8L160.2 107.9L153.3 104.9L149 102.9C147.9 102.4 146.5 102.6 145.5 103.4L145.1 103.8C143.7 105 141.6 105 140.2 103.9L136.9 101.3C136.5 100.9 135.9 100.7 135.3 100.6L129.5 99.8L126.1 96.7L125.6 96.3C123.6 94.6 120.7 94.2 118.2 95.3L109.8 99.7C108.4 100.6 106.1 102.9 104.3 104.7C102.9 106.1 101.8 107.2 101.4 107.5C100.7 107.9 89.8 106.2 82.7 104.9C79 104.2 74.9 105 71.9 107.1L63.9 112.7L61.2 115.5C59.4 117.3 57.2 118.7 54.7 119.7L49 123L46 124.8H39.7L34.7 123H28L9 106.5C7 104.7 3.9 104.9 2 106.9L0 108.7V125.5" fill="currentColor" />
        </svg>
      </div>
    </div>

    <!-- Body -->
    <div class="w-full max-w-390 px-4 mx-auto pt-8 grid grid-cols-1 lg:grid-cols-[18em_1fr] gap-4">
      <!-- Sidebar -->
      <TheDrawer
        :open="isDrawerOpen"
        :drawer-class="'bg-gray-100 dark:bg-secondary-black p-4 w-20em border-r nuxt-border h-full overflow-auto'"
        @close="isDrawerOpen=false"
      >
        <div class="p-4 relative">
          <button
            aria-label="Close Drawer"
            class="absolute top-0 right-0 !outline-none text-2xl block lg:hidden"
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

          <!-- Footer -->
          <TheFooter />
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
  </div>
</template>

<script setup lang="ts">
// import LazyHydrate from 'vue-lazy-hydration'
import Fuse from 'fuse.js/dist/fuse.basic.esm'
import { CATEGORIES_ICONS, MODULE_INCREMENT_LOADING, VERSIONS } from '~/composables/constants'
import type { ModulesData } from '~/composables/fetch'

const sort = (a:number, b:number, asc?:boolean) => asc ? a - b : b - a

const props = defineProps<{
  state: ModulesData
}>()

const route = useRoute()
const searchEl = ref()

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
const fuse = computed(() => {
  const fuseIndex = Fuse.createIndex(fuseOptions.keys, props.state.modules)
  return new Fuse(props.state.modules, fuseOptions, fuseIndex)
})

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
    modules = fuse.value.search(q.value).map(r => r.item)
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
watch(() => route, applyURLFilters)

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
  const url = route.path
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
