<template>
  <div class="pb-16">
    <div class="bg-forest-night pt-16 pb-16 sm:pb-24">
      <div class="pb-10 text-center px-4 sm:px-6 lg:px-8">
        <div class="flex justify-center">
          <svg class="w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 298">
            <g fill="none" fill-rule="nonzero">
              <path fill="#00C58E" d="M227.92099 82.07407l-13.6889 23.7037-46.8148-81.08641L23.7037 273.58025h97.3037c0 13.0912 10.61252 23.7037 23.70371 23.7037H23.70371c-8.46771 0-16.29145-4.52017-20.5246-11.85382-4.23315-7.33366-4.23272-16.36849.00114-23.70174L146.89383 12.83951c4.23415-7.33433 12.0596-11.85252 20.5284-11.85252 8.46878 0 16.29423 4.51819 20.52839 11.85252l39.97037 69.23456z"/>
              <path fill="#FFF" d="M331.6642 261.7284l-90.05432-155.95062-13.6889-23.7037-13.68888 23.7037-90.04445 155.95061c-4.23385 7.33325-4.23428 16.36808-.00113 23.70174 4.23314 7.33365 12.05689 11.85382 20.5246 11.85382h166.4c8.46946 0 16.29644-4.51525 20.532-11.84955 4.23555-7.3343 4.23606-16.37123.00132-23.706h.01976zM144.7111 273.58024L227.921 129.48148l83.19012 144.09877h-166.4z"/>
              <path fill="#108775" d="M396.04938 285.4321c-4.23344 7.33254-12.05656 11.85185-20.52345 11.85185H311.1111c13.0912 0 23.7037-10.6125 23.7037-23.7037h40.66173L260.09877 73.74815l-18.4889 32.02963-13.68888-23.7037L239.5753 61.8963c4.23416-7.33433 12.0596-11.85252 20.5284-11.85252 8.46879 0 16.29423 4.51819 20.52839 11.85252l115.41728 199.8321c4.23426 7.33395 4.23426 16.36975 0 23.7037z"/>
            </g>
          </svg>
        </div>
        <h1 class="mt-4 text-4xl leading-10 font-extrabold text-white sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">Explore Nuxt Modules</h1>
        <p class="max-w-xl mt-5 mx-auto text-lg sm:text-xl leading-7 text-rainy-grey">Discover our list of modules to supercharge your <a href="https://nuxtjs.org" class="border-b border-stone-green hover:text-green-500 hover:border-green-600">Nuxt project</a>. Created by the Nuxt team and community.</p>
        <div class="max-w-xl mt-2 mx-auto text-center">
          <a href="https://github.com/nuxt/modules" class="text-md leading-4 items-center space-x-1 text-grey-light border-b border-stone-green hover:text-green-500 hover:border-green-600">
            Contribute on GitHub
          </a>
        </div>
      </div>
    </div>
    <div class="relative -mt-16 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <dl class="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
          <div class="flex justify-center sm:flex-col border-b border-gray-100 p-4 sm:p-6 text-center sm:border-0 sm:border-r">
            <dt class="order-2 sm:mt-2 ml-2 sm:ml-0 sm:text-md leading-6 font-medium text-gray-500 sm:capitalize" id="item-1">
              modules
            </dt>
            <dd class="order-1 text-2xl sm:text-4xl leading-none font-extrabold text-green-600" aria-describedby="item-1">
              {{ modules.length }}
            </dd>
          </div>
          <div class="flex justify-center sm:flex-col border-t border-b border-gray-100 p-4 sm:p-6 text-center sm:border-0 sm:border-l sm:border-r">
            <dt class="order-2 sm:mt-2 ml-2 sm:ml-0 sm:text-md leading-6 font-medium text-gray-500 sm:capitalize">
              downloads last 30 days
            </dt>
            <dd class="order-1 text-2xl sm:text-4xl leading-none font-extrabold text-green-600">
              {{ downloads }}
            </dd>
          </div>
          <div class="flex justify-center sm:flex-col border-t border-gray-100 p-4 sm:p-6 text-center sm:border-0 sm:border-l">
            <dt class="order-2 sm:mt-2 ml-2 sm:ml-0 sm:text-md leading-6 font-medium text-gray-500 sm:capitalize">
              maintainers
            </dt>
            <dd class="order-1 text-2xl sm:text-4xl leading-none font-extrabold text-green-600">
              {{ maintainers.length }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
    <div class="pt-12 pb-8 container mx-auto px-4 sm:px-0">
      <div class="sm:max-w-lg sm:mx-auto flex border border-rainy-grey rounded-md overflow-hidden shadow-sm">
        <input v-model="q" v-focus aria-label="Search" class="flex-1 appearance-none block p-3 text-base leading-6 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out sm:flex-1" placeholder="Search a module (name, category, username, etc.)">
        <button class="px-6 py-3 bg-rainy-grey hover:bg-grey-light text-gray-700 text-base leading-6 font-medium shadow-sm focus:outline-none transition duration-150 ease-in-out sm:mt-0 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
      </div>
      <div class="flex sm:flex-wrap space-x-2 sm:justify-center pt-6 overflow-x-auto">
        <button v-for="category of categories" :key="category" @click="toggleCategory(category)" class="px-4 py-2 text-sm rounded focus:outline-none mb-2 cursor-pointer uppercase" :class="[ selectedCategory === category ? 'bg-forest-night text-white' : 'text-forest-night bg-rainy-grey hover:bg-grey-light']">{{ category }}</button>
      </div>
    </div>
    <div class="container mx-auto px-4 sm:px-0">
      <p class="mb-4 text-stone-green">{{ filteredModules.length }} module{{ filteredModules.length !== 1 ? 's' : '' }} found</p>
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        <div v-for="module of filteredModules" :key="module.name" class="relative flex flex-col bg-white shadow rounded-md overflow-hidden hover:shadow-lg">
          <div class="relative flex flex-1 flex-col space-y-2 px-6 py-8 group">
            <a :href="module.website" target="_blank" rel="noopener" class="absolute inset-0"></a>
            <div class="transition-opacity duration-200 ease-in-out opacity-0 group-hover:opacity-100 text-stone-green absolute top-4 right-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </div>
            <img :src="iconUrl(module)" :alt="module.name" class="w-10 h-10" />
            <h2 class="flex text-2xl items-center pt-2">
              <span>{{ module.name }}</span>
              <svg v-if="isOfficial(module)" xmlns="http://www.w3.org/2000/svg" class="ml-2 mt-1 h-5 w-5 text-clay-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
            </h2>
            <p class="text-gray-500 group-hover:text-gray-800">{{ module.description }}</p>
          </div>
          <div class="border-t border-gray-200 bg-gray-100 grid grid-cols-3">
            <a :href="npmUrl(module)" target=" _blank" rel="noopener" class="group flex items-center space-x-2 border-r border-gray-200 py-3 px-4 pl-6">
              <svg class="h-8 text-gray-600 group-hover:text-campfire-orange" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M 0 10 L 0 21 L 9 21 L 9 23 L 16 23 L 16 21 L 32 21 L 32 10 L 0 10 z M 1.7773438 11.777344 L 8.8886719 11.777344 L 8.890625 11.777344 L 8.890625 19.445312 L 7.1113281 19.445312 L 7.1113281 13.556641 L 5.3339844 13.556641 L 5.3339844 19.445312 L 1.7773438 19.445312 L 1.7773438 11.777344 z M 10.667969 11.777344 L 17.777344 11.777344 L 17.779297 11.777344 L 17.779297 19.443359 L 14.222656 19.443359 L 14.222656 21.222656 L 10.667969 21.222656 L 10.667969 11.777344 z M 19.556641 11.777344 L 30.222656 11.777344 L 30.224609 11.777344 L 30.224609 19.445312 L 28.445312 19.445312 L 28.445312 13.556641 L 26.667969 13.556641 L 26.667969 19.445312 L 24.890625 19.445312 L 24.890625 13.556641 L 23.111328 13.556641 L 23.111328 19.445312 L 19.556641 19.445312 L 19.556641 11.777344 z M 14.222656 13.556641 L 14.222656 17.667969 L 16 17.667969 L 16 13.556641 L 14.222656 13.556641 z" fill="currentcolor" />
              </svg>
              <div class="text-sm leading-5 text-gray-600 group-hover:text-gray-900 font-medium">{{ numberFormat(module.downloads) }}</div>
            </a>
            <a :href="module.github" target=" _blank" rel="noopener" class="group flex items-center space-x-1 py-3 px-4 border-r border-gray-200">
              <svg class="w-5 h-5 text-gray-600 group-hover:text-sun-yellow-darkest" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <div class="text-sm leading-5 text-gray-600 group-hover:text-gray-900 font-medium">{{ numberFormat(module.stars) }} <span class="hidden md:inline-block">star{{ module.stars !== 1 ? 's' : '' }}</span></div>
            </a>
            <div class="maintainers-list group flex items-center space-x-1 py-3 px-4 z-0 overflow-hidden">
              <svg class="w-5 h-5 mr-1 text-gray-600 group-hover:text-sky-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <a v-for="maintainer of module.maintainers" :key="maintainer.github" :href="maintainer.github" v-tooltip="{ content: maintainer.github, classes: ['bg-forest-night', 'text-white', 'px-2', 'py-1', 'rounded', 'text-sm'] }" target="_blank" rel="noopener">
                <img class="relative inline-block h-6 w-6 rounded-full text-white shadow-solid transition-opacity duration-200 opacity-75 group-hover:opacity-100" :src="maintainer.avatar" :alt="maintainer.name">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      q: '',
      selectedCategory: null
    }
  },
  async asyncData ({ $http }) {
    let url = process.dev ? 'http://localhost:3000' : 'https://nuxt-modules.vercel.app'
    const modules = await $http.$get(`${url}/api/modules`)
    const categories = []
    const maintainers = []
    let downloads = 0

    modules.forEach(module => {
      downloads += (module.downloads || 0)
      module.categories.forEach(category => {
        if (categories.indexOf(category) === -1) {
          categories.push(category)
        }
      })
      categories.sort()
      module.maintainers.forEach(maintainer => {
        if (!maintainers.find(m => m.name === maintainer.name)) {
          maintainers.push(maintainer)
        }
      })
    })

    modules.sort((m1, m2) => m2.downloads - m1.downloads)

    return {
      modules,
      categories,
      maintainers,
      downloads: Intl.NumberFormat('en-US', { notation: 'compact' }).format(downloads)
    }
  },
  computed: {
    filteredModules () {
      let modules = this.modules
      if (this.selectedCategory) {
        modules = modules.filter(module => module.categories.indexOf(this.selectedCategory) !== -1)
      }
      if (!this.q) {
        return modules
      }
      const q = this.q.trim().toLowerCase()
      return modules.filter(module => {
        const search = [module.name, module.npm, module.repo, module.description].concat(module.maintainers.map(m => m.name + ' ' + m.github)).concat(module.categories).join(' ')
        return search.toLowerCase().indexOf(q) !== -1
      })
    }
  },
  methods: {
    numberFormat (downloads) {
      return Intl.NumberFormat('en-US', { notation: 'compact' }).format(downloads)
    },
    iconUrl ({ name, icon, categories }) {
      if (/^https?:\/\//.test(icon)) {
        return icon
      }
      if (icon) {
        return `https://cdn.jsdelivr.net/gh/nuxt/integrations@feat/website/icons/${icon}`
      }
      const category = categories.length ? categories[0] : 'uncategorized'
      return `/categories/${category}.svg`
    },
    npmUrl ({ npm }) {
      return `https://npmjs.com/package/${npm}`
    },
    isOfficial ({ labels }) {
      return labels && labels.indexOf('official') !== -1
    },
    toggleCategory (category) {
      if (this.selectedCategory === category) {
        this.selectedCategory = null
        return
      }
      this.selectedCategory = category
    }
  },
  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        el.focus()
      }
    }
  },
  head: {
    title: 'Explore Nuxt Modules'
  }
}
</script>


<style scoped>
.maintainers-list {
  filter: grayscale(100%);
  &:hover {
    filter: none;
  }
}
</style>