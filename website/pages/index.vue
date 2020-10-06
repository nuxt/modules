<template>
  <div class="pb-16">
    <div class="bg-gradient-to-b from-green-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-base leading-6 font-semibold text-green-500 tracking-wide uppercase">NuxtJS.dev</h1>
        <p class="mt-1 text-4xl leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">Browse Nuxt Modules</p>
        <p class="max-w-xl mt-5 mx-auto text-xl leading-7 text-gray-500">Discover our list of modules to supercharge your <a href="https://nuxtjs.org">Nuxt project</a>. Created by the nuxt team and community.</p>
      </div>
    </div>
    <div class="relative">
      <div class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <dl class="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
            <div class="flex flex-col border-b border-gray-100 p-4 text-center sm:border-0 sm:border-r">
              <dt class="order-2 mt-2 text-md leading-6 font-medium text-gray-500" id="item-1">
                Modules
              </dt>
              <dd class="order-1 text-4xl leading-none font-extrabold text-green-500" aria-describedby="item-1">
                {{ modules.length }}
              </dd>
            </div>
            <div class="flex flex-col border-t border-b border-gray-100 p-4 text-center sm:border-0 sm:border-l sm:border-r">
              <dt class="order-2 mt-2 text-md leading-6 font-medium text-gray-500">
                Downloads last 30 days
              </dt>
              <dd class="order-1 text-4xl leading-none font-extrabold text-green-500">
                {{ downloads }}
              </dd>
            </div>
            <div class="flex flex-col border-t border-gray-100 p-4 text-center sm:border-0 sm:border-l">
              <dt class="order-2 mt-2 text-md leading-6 font-medium text-gray-500">
                Maintainers
              </dt>
              <dd class="order-1 text-4xl leading-none font-extrabold text-green-500">
                {{ maintainers.length }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
    <div class="mt-12 sm:max-w-lg sm:mx-auto">
      <form action="#" method="POST" class="mt-3 sm:flex">
        <input v-model="q" v-focus aria-label="Search" class="appearance-none block w-full px-3 py-3 border border-gray-300 text-base leading-6 rounded-l-md placeholder-gray-500 shadow-sm focus:outline-none focus:placeholder-gray-400 focus:border-gray-400 transition duration-150 ease-in-out sm:flex-1" placeholder="Search a module">
        <button type="submit" class="mt-3 w-full px-6 py-3 text-gray-700 hover:text-gray-500 border border-l-0 border-gray-300 text-base leading-6 font-medium rounded-r-md shadow-sm focus:outline-none transition duration-150 ease-in-out sm:mt-0 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
      </form>
    </div>
    <div class="container mx-auto mt-12 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      <a v-for="module of filteredModules" :key="module.name" :href="module.website" target="_blank" rel="noopener" class="flex flex-col space-y-2 bg-white shadow rounded-md p-6 hover:shadow-lg cursor-pointer">
        <img :src="iconUrl(module)" :alt="module.name" class="w-10 h-10" />
        <h2 class="text-3xl">{{ module.name }}</h2>
        <p class="text-gray-800">{{ module.description }}</p>
        <a :href="npmUrl(module)" target=" _blank" rel="noopener" class="group flex items-center space-x-2.5">
          <svg class="w-5 h-5 text-gray-700 group-hover:text-red-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path d="M 0 10 L 0 21 L 9 21 L 9 23 L 16 23 L 16 21 L 32 21 L 32 10 L 0 10 z M 1.7773438 11.777344 L 8.8886719 11.777344 L 8.890625 11.777344 L 8.890625 19.445312 L 7.1113281 19.445312 L 7.1113281 13.556641 L 5.3339844 13.556641 L 5.3339844 19.445312 L 1.7773438 19.445312 L 1.7773438 11.777344 z M 10.667969 11.777344 L 17.777344 11.777344 L 17.779297 11.777344 L 17.779297 19.443359 L 14.222656 19.443359 L 14.222656 21.222656 L 10.667969 21.222656 L 10.667969 11.777344 z M 19.556641 11.777344 L 30.222656 11.777344 L 30.224609 11.777344 L 30.224609 19.445312 L 28.445312 19.445312 L 28.445312 13.556641 L 26.667969 13.556641 L 26.667969 19.445312 L 24.890625 19.445312 L 24.890625 13.556641 L 23.111328 13.556641 L 23.111328 19.445312 L 19.556641 19.445312 L 19.556641 11.777344 z M 14.222656 13.556641 L 14.222656 17.667969 L 16 17.667969 L 16 13.556641 L 14.222656 13.556641 z" fill="currentcolor" />
          </svg>
          <div class="text-sm leading-5 text-gray-700 group-hover:text-gray-900 font-medium">{{ module.npm }}</div>
        </a>
        <a :href="module.github" target=" _blank" rel="noopener" class="group flex items-center space-x-2.5">
          <svg class="w-5 h-5 text-gray-600 group-hover:text-gray-900" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.99917 0C4.02996 0 0 4.02545 0 8.99143C0 12.9639 2.57853 16.3336 6.15489 17.5225C6.60518 17.6053 6.76927 17.3277 6.76927 17.0892C6.76927 16.8762 6.76153 16.3104 6.75711 15.5603C4.25372 16.1034 3.72553 14.3548 3.72553 14.3548C3.31612 13.316 2.72605 13.0395 2.72605 13.0395C1.9089 12.482 2.78793 12.4931 2.78793 12.4931C3.69127 12.5565 4.16643 13.4198 4.16643 13.4198C4.96921 14.7936 6.27312 14.3968 6.78584 14.1666C6.86761 13.5859 7.10022 13.1896 7.35713 12.965C5.35873 12.7381 3.25756 11.9665 3.25756 8.52116C3.25756 7.53978 3.6084 6.73667 4.18411 6.10854C4.09129 5.88114 3.78244 4.96654 4.27251 3.72904C4.27251 3.72904 5.02778 3.48728 6.74717 4.65082C7.46487 4.45101 8.23506 4.35165 9.00028 4.34779C9.76494 4.35165 10.5346 4.45101 11.2534 4.65082C12.9717 3.48728 13.7258 3.72904 13.7258 3.72904C14.217 4.96654 13.9082 5.88114 13.8159 6.10854C14.3927 6.73667 14.7408 7.53978 14.7408 8.52116C14.7408 11.9753 12.6363 12.7354 10.6318 12.9578C10.9545 13.2355 11.2423 13.7841 11.2423 14.6231C11.2423 15.8247 11.2313 16.7945 11.2313 17.0892C11.2313 17.3299 11.3937 17.6097 11.8501 17.522C15.4237 16.3303 18 12.9628 18 8.99143C18 4.02545 13.97 0 8.99917 0Z" fill="currentcolor" />
          </svg>
          <div class="text-sm leading-5 text-gray-500 group-hover:text-gray-900 font-medium">{{ module.repo.split('#')[0] }}</div>
        </a>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      q: ''
    }
  },
  async asyncData ({ $http }) {
    let url = process.dev ? 'http://localhost:3000' : 'https://nuxtjs.dev'
    const modules = await $http.$get(`${url}/api/modules`)
    const maintainers = []
    let downloads = 0

    modules.forEach(module => {
      downloads += (module.downloads || 0)
      module.maintainers.forEach(({ name }) => {
        if (maintainers.indexOf(name) === -1) {
          maintainers.push(name)
        }
      })
    })

    return {
      modules,
      maintainers,
      downloads: Intl.NumberFormat('en-US', { notation: 'compact' }).format(downloads)
    }
  },
  computed: {
    filteredModules () {
      if (!this.q) {
        return this.modules
      }
      const q = this.q.trim().toLowerCase()
      return this.modules.filter(module => {
        const name = [module.name, module.npm, module.github, module.description].concat(module.categories).join(' ')
        return name.toLowerCase().indexOf(q) !== -1
      })
    }
  },
  methods: {
    downloadsFormat(downloads) {
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
      return `/icons/${category}.svg`
    },
    npmUrl ({ npm }) {
      return `https://npmjs.com/package/${npm}`
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
