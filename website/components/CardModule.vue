<template>
  <div class="flex flex-col h-full relative">
    <div class="relative flex flex-1 flex-col space-y-2 p-8 group text-sky-darkest">
      <a
        :href="module.website"
        :aria-label="module.website"
        target="_blank"
        rel="noopener"
        class="absolute inset-0"
      >
        <div
          class="transition-opacity duration-200 ease-in-out opacity-0 group-hover:opacity-100 absolute top-4 right-6 cursor-pointer"
        >
          <img alt="website" src="~/assets/icons/ext.svg" width="40" height="40" />
        </div>
      </a>

      <div class="flex flex-col justify-between items-start">
        <div class="flex items-start h-28">
          <div
            class="border border-gray-200 w-20 h-20 rounded-lg flex flex-none items-center justify-center"
          >
            <nuxt-img
              :src="iconUrl(module)"
              :alt="module.name"
              class="w-10 h-10 object-contain"
              width="40px"
              height="40px"
            />
          </div>
          <div class="ml-4">
            <h2 class="flex text-xl font-medium items-center">
              <span>{{ module.name }}</span>
              <img
                v-if="module.type === 'official'"
                alt="official"
                src="~/assets/icons/official.svg"
                width="20"
                height="20"
                class="ml-1 mt-1"
              />
            </h2>
            <p class="text-sky-dark group-hover:text-gray-800 text-sm font-light line-clamp-4">{{ module.description }}</p>
          </div>
        </div>
        <div class="grid grid-cols-1 flex flex-none w-full mt-8 divide-y">
          <div
            class="flex items-center space-x-4 justify-between text-xs  w-full px-2 py-1"
          >
            <div>
              <iconNuxt3 class="h-6 w-6 mr-1 inline-block" aria-hidden="true" />
              <span>Nuxt 3</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              class="h-6 w-6 inline-block text-primary-600"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9.86 18a1 1 0 0 1-.73-.32l-4.86-5.17a1 1 0 1 1 1.46-1.37l4.12 4.39l8.41-9.2a1 1 0 1 1 1.48 1.34l-9.14 10a1 1 0 0 1-.73.33z"
              />
            </svg>
          </div>

          <div
            class="flex items-center justify-between text-xs text-sky-darkest  w-full px-2 py-2"
          >
            <div>
              <svg width="1em" height="1em" viewBox="0 0 24 24" class="h-6 w-6 mr-1 inline-block text-sky-darkest">
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon-tabler"
                >
                  <path d="M6 5v14" />
                  <path d="M18 5v14" />
                  <path d="M2 15h20" />
                  <path d="M3 8a7.5 7.5 0 0 0 3-2a6.5 6.5 0 0 0 12 0a7.5 7.5 0 0 0 3 2" />
                  <path d="M12 10v5" />
                </g>
              </svg>
              <span>Nuxt 2.x-bridge</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              class="h-6 w-6 inline-block text-primary-600"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9.86 18a1 1 0 0 1-.73-.32l-4.86-5.17a1 1 0 1 1 1.46-1.37l4.12 4.39l8.41-9.2a1 1 0 1 1 1.48 1.34l-9.14 10a1 1 0 0 1-.73.33z"
              />
            </svg>
          </div>

          <div
            class="flex items-center justify-between text-xs text-sky-darkest w-full px-2 py-2"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                viewBox="0 0 32 32"
                class="h-6 w-6 mr-1 inline-block text-sky-darkest"
              >
                <path
                  d="M26.297 27.031l.031-.063a.746.746 0 0 0 .073-.156v-.005c.099-.26.12-.536.073-.813v.01a2.368 2.368 0 0 0-.313-.828l.01.01l-7.094-12.474l-1.083-1.891l-8.156 14.365c-.141.25-.229.521-.276.802v.016c-.057.323-.021.651.109.953l-.005-.01c.016.047.042.089.068.135l-.005-.005c.214.365.667.802 1.667.802h13.198c.208 0 1.234-.042 1.708-.849zm-8.302-12.422l6.479 11.396H11.521zm13.666 10.579L22.307 8.709c-.099-.177-.635-1.052-1.578-1.052c-.422 0-1.026.182-1.521 1.047L18 10.824l1.073 1.896l1.667-2.953l9.255 16.245h-3.521c.047.271.021.547-.073.807v-.01c-.021.057-.042.115-.073.167v-.005l-.031.063c-.474.807-1.495.849-1.693.849h5.505c.203 0 1.219-.042 1.693-.849c.214-.37.359-.984-.141-1.844zM9.74 27.078l-.063-.125v-.005a1.668 1.668 0 0 1-.115-.953v.01H1.999l11.24-19.776l3.687 6.484l1.073-1.891l-3.219-5.667c-.089-.161-.63-1.036-1.568-1.036c-.422 0-1.031.182-1.521 1.052L.306 25.187c-.099.172-.568 1.078-.099 1.885c.214.37.667.802 1.667.802h9.531c-.99 0-1.453-.427-1.667-.802z"
                  fill="currentColor"
                />
              </svg>
              <span>Nuxt 2.x</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              class="h-6 w-6 inline-block text-primary-600"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9.86 18a1 1 0 0 1-.73-.32l-4.86-5.17a1 1 0 1 1 1.46-1.37l4.12 4.39l8.41-9.2a1 1 0 1 1 1.48 1.34l-9.14 10a1 1 0 0 1-.73.33z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-200 bg-gray-100 grid grid-cols-3">
      <a
        :href="npmUrl(module)"
        aria-label="npm"
        target=" _blank"
        rel="noopener"
        class="stats-block group flex flex-col justify-between border-r border-gray-200 hover:bg-gray-200 hover:bg-opacity-50 py-3 px-4 pl-6"
      >
        <img alt="npm" src="~/assets/icons/npm.svg" width="24" height="24" class="icon" />
        <div
          class="text-sm leading-5 text-sky-dark group-hover:text-gray-900 font-medium"
        >{{ numberFormat(module.downloads) }}</div>
      </a>
      <a
        :href="module.github"
        aria-label="stars"
        target=" _blank"
        rel="noopener"
        class="stats-block group flex flex-col justify-between py-3 px-4 border-r border-gray-200 hover:bg-gray-200 hover:bg-opacity-50"
      >
        <img alt="stars" src="~/assets/icons/star.svg" width="20" height="20" class="icon" />
        <div class="text-sm leading-5 text-sky-dark group-hover:text-gray-900 font-medium truncate">
          {{ numberFormat(module.stars) }}
          <span
            class="hidden md:inline-block"
          >star{{ module.stars !== 1 ? 's' : '' }}</span>
        </div>
      </a>
      <div
        class="stats-block group flex flex-col justify-between py-3 px-4 z-0 overflow-hidden hover:bg-gray-200 hover:bg-opacity-50"
      >
        <img
          alt="maintainer"
          src="~/assets/icons/maintainer.svg"
          width="20"
          height="20"
          class="icon mr-1"
        />
        <div class="flex space-x-2 pt-2">
          <a
            v-for="maintainer of module.maintainers"
            :key="maintainer.github"
            v-tooltip="{ content: maintainer.github, classes: ['bg-forest-night', 'text-white', 'px-2', 'py-1', 'rounded', 'text-sm'] }"
            :aria-label="maintainer.github"
            :href="githubUrl(maintainer)"
            target="_blank"
            rel="noopener"
          >
            <nuxt-img
              class="w-6 h-6 relative rounded-full text-white shadow-solid transition-opacity duration-200 opacity-75 group-hover:opacity-100"
              :src="maintainer.avatar + '&s=24'"
              :alt="maintainer.name"
              format="jpg"
              width="22"
              height="22"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { numberFormatter } from '~/utils/format.ts'

export default {
  name: 'CardModule',
  props: {
    statusMap: {
      type: Object,
      required: true
    },
    module: {
      type: Object,
      required: true
    }
  },
  computed: {
    compatibility() {
      return Object.entries(this.module.compatibility || {})
        .map(([key, status]) => ({ ...this.statusMap[status], label: key }))
    }
  },
  methods: {
    numberFormat(num, options = { precision: 1 }) {
      return numberFormatter(num, options)
    },
    iconUrl({ icon, category }) {
      if (icon) {
        return `/icons/${icon}`
      }
      return `/categories/${category.toLowerCase()}.svg`
    },
    npmUrl({ npm }) {
      return `https://npmjs.com/package/${npm}`
    },
    githubUrl({ github }) {
      return `https://github.com/${github}`
    }
  }
}
</script>

<style scoped>
.stats-block {
  & img {
    filter: grayscale(100%);
    &.icon {
      filter: grayscale(100%) contrast(0%);
    }
  }
  &:hover {
    & img {
      filter: none;
      &.icon {
        filter: none;
      }
    }
  }
}
</style>
