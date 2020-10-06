<template>
  <div class="pb-16">
    <div class="bg-forest-night pb-24">
      <div class="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-base leading-6 font-semibold text-green-500 tracking-wide uppercase">nuxtjs.dev</h1>
          <p class="mt-1 text-4xl leading-10 font-extrabold text-white sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">Explore Nuxt Modules</p>
          <p class="max-w-xl mt-5 mx-auto text-xl leading-7 text-gray-200">Discover our list of modules to supercharge your <a href="https://nuxtjs.org">Nuxt project</a>. Created by the nuxt team and community.</p>
        </div>
      </div>
    </div>
    <div class="relative -mt-16 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <dl class="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
          <div class="flex flex-col border-b border-gray-100 p-8 text-center sm:border-0 sm:border-r">
            <dt class="order-2 mt-2 text-md leading-6 font-medium text-gray-500" id="item-1">
              Modules
            </dt>
            <dd class="order-1 text-4xl leading-none font-extrabold text-green-600" aria-describedby="item-1">
              {{ modules.length }}
            </dd>
          </div>
          <div class="flex flex-col border-t border-b border-gray-100 p-8 text-center sm:border-0 sm:border-l sm:border-r">
            <dt class="order-2 mt-2 text-md leading-6 font-medium text-gray-500">
              Downloads last 30 days
            </dt>
            <dd class="order-1 text-4xl leading-none font-extrabold text-green-600">
              {{ downloads }}
            </dd>
          </div>
          <div class="flex flex-col border-t border-gray-100 p-8 text-center sm:border-0 sm:border-l">
            <dt class="order-2 mt-2 text-md leading-6 font-medium text-gray-500">
              Maintainers
            </dt>
            <dd class="order-1 text-4xl leading-none font-extrabold text-green-600">
              {{ maintainers.length }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
    <div class="py-12 container mx-auto">
      <div class="sm:max-w-lg sm:mx-auto flex border border-rainy-grey rounded-md overflow-hidden shadow-sm">
        <input v-model="q" v-focus aria-label="Search" class="appearance-none block w-full px-3 py-3 text-base leading-6 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out sm:flex-1" placeholder="Search a module">
        <button class="mt-3 w-full px-6 py-3 bg-rainy-grey hover:bg-stone-green text-gray-700 hover:text-white text-base leading-6 font-medium shadow-sm focus:outline-none transition duration-150 ease-in-out sm:mt-0 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
      </div>
      <div class="flex flex-wrap space-x-2 justify-center pt-6">
        <button v-for="category of categories" :key="category" @click="toggleCategory(category)" class="px-4 py-2 text-sm rounded focus:outline-none mb-2 cursor-pointer uppercase" :class="[ selectedCategory === category ? 'bg-forest-night text-white' : 'text-forest-night bg-rainy-grey']">{{ category }}</button>
      </div>
    </div>
    <div class="container mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-8">
      <a v-for="module of filteredModules" :key="module.name" :href="module.website" target="_blank" rel="noopener" class="relative flex flex-col bg-white shadow rounded-md overflow-hidden hover:shadow-lg cursor-pointer">
        <div class="flex flex-1 flex-col space-y-2 px-6 py-8 group">
          <div class="transition-opacity duration-200 ease-in-out opacity-0 group-hover:opacity-100 text-stone-green absolute top-0 right-0 mr-6 mt-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </div>
          <img :src="iconUrl(module)" :alt="module.name" class="w-10 h-10" />
          <h2 class="flex text-2xl items-center pt-2">
            <span>{{ module.name }}</span>
            <svg v-if="isOfficial(module)" xmlns="http://www.w3.org/2000/svg" class="ml-2 mt-1 h-5 w-5 text-clay-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
          </h2>
          <p class="text-gray-500 group-hover:text-gray-800">{{ module.description }}</p>
        </div>
        <div class="border-t border-gray-200 bg-gray-100 grid grid-cols-2">
          <a :href="npmUrl(module)" target=" _blank" rel="noopener" class="group flex items-center space-x-2 border-r border-gray-200 py-3 px-4 pl-6">
            <svg class="h-8 text-gray-600 group-hover:text-red-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M 0 10 L 0 21 L 9 21 L 9 23 L 16 23 L 16 21 L 32 21 L 32 10 L 0 10 z M 1.7773438 11.777344 L 8.8886719 11.777344 L 8.890625 11.777344 L 8.890625 19.445312 L 7.1113281 19.445312 L 7.1113281 13.556641 L 5.3339844 13.556641 L 5.3339844 19.445312 L 1.7773438 19.445312 L 1.7773438 11.777344 z M 10.667969 11.777344 L 17.777344 11.777344 L 17.779297 11.777344 L 17.779297 19.443359 L 14.222656 19.443359 L 14.222656 21.222656 L 10.667969 21.222656 L 10.667969 11.777344 z M 19.556641 11.777344 L 30.222656 11.777344 L 30.224609 11.777344 L 30.224609 19.445312 L 28.445312 19.445312 L 28.445312 13.556641 L 26.667969 13.556641 L 26.667969 19.445312 L 24.890625 19.445312 L 24.890625 13.556641 L 23.111328 13.556641 L 23.111328 19.445312 L 19.556641 19.445312 L 19.556641 11.777344 z M 14.222656 13.556641 L 14.222656 17.667969 L 16 17.667969 L 16 13.556641 L 14.222656 13.556641 z" fill="currentcolor" />
            </svg>
            <div class="text-sm leading-5 text-gray-600 group-hover:text-gray-900 font-medium">{{ downloadsFormat(module.downloads) }}</div>
          </a>
          <a :href="module.github" target=" _blank" rel="noopener" class="group flex items-center space-x-1 py-3 px-4">
            <svg class="w-5 h-5 text-gray-600 group-hover:text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <div class="text-sm leading-5 text-gray-600 group-hover:text-gray-900 font-medium">245 stars</div>
          </a>
        </div>
      </a>
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
    let url = process.dev ? 'http://localhost:3000' : 'https://nuxtjs.dev'
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
      module.maintainers.forEach(({ name }) => {
        if (maintainers.indexOf(name) === -1) {
          maintainers.push(name)
        }
      })
    })

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
        const name = [module.name, module.npm, module.repo, module.description].concat(module.categories).join(' ')
        return name.toLowerCase().indexOf(q) !== -1
      })
    }
  },
  methods: {
    downloadsFormat (downloads) {
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
    title: 'Browse Nuxt Modules'
  }
}
</script>
