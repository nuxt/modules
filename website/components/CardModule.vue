<template>
  <div class="flex flex-col h-full relative">
    <div class="relative flex flex-1 flex-col space-y-2 p-8 text-sky-darkest dark:text-white">
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
          <img alt="website" src="~/assets/icons/ext.svg" width="32" height="32">
        </div>
      </a>

      <div class="flex flex-col justify-between items-start">
        <div class="flex flex-col items-start h-24">
          <div
            class="-mt-20 border group-hover:border-primary-600 dark:group-hover:border-secondary-dark bg-white border-gray-200 dark:bg-secondary-dark dark:border-secondary-dark w-20 h-20 rounded-lg flex flex-none items-center justify-center"
          >
            <nuxt-img
              :src="iconUrl(module)"
              :alt="module.name"
              class="w-10 h-10 object-contain"
              width="40px"
              height="40px"
            />
          </div>
          <div class="mt-2">
            <h2 class="flex text-xl font-semibold items-center dark:text-white">
              <span>{{ module.name }}</span>
              <img
                v-if="module.type === 'official'"
                alt="official"
                src="~/assets/icons/official.svg"
                width="20"
                height="20"
                class="ml-1 mt-1"
              >
            </h2>
            <p
              class="text-sky-dark dark:text-white text-sm font-light line-clamp-3"
            >
              {{ module.description }}
            </p>
          </div>
        </div>
        <div class="flex justify-around w-full">
          <div v-for="c of compatibility" :key="c.label" class="flex flex-col items-center pt-3">
            <div
              v-tooltip="{ content: c.label, classes: ['bg-secondary-dark', 'text-white', 'px-2', 'py-1', 'rounded', 'text-sm'] }"
              class="flex items-center justify-between text-base bg-gray-100 dark:bg-secondary-dark rounded-lg w-full px-2 py-1 z-50"
            >
              <iconNuxt3
                v-show="c.label === '3.x'"
                class="h-6 w-6 mr-1 inline-block"
                aria-hidden="true"
              />
              <iconNuxt2
                v-show="c.label === '2.x'"
                class="h-6 w-6 mr-1 inline-block"
                aria-hidden="true"
              />
              <iconNuxtBridge
                v-show="c.label === '2.x-bridge'"
                class="h-6 w-6 mr-1 inline-block"
                aria-hidden="true"
              />
              {{ c.icon }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="border-t border-gray-200 rounded-b-lg dark:border-secondary-dark bg-gray-100 dark:bg-secondary-black grid grid-cols-1"
    >
      <div class="flex justify-between bg-white dark:bg-secondary-darker">
        <a
          :href="npmUrl(module)"
          aria-label="npm"
          target=" _blank"
          rel="noopener"
          class=" w-full group flex justify-between hover:bg-gray-200 dark:hover:bg-secondary hover:bg-opacity-50 py-3 px-4 pl-6"
        >
          <iconDownload class="pr-4" />
          <div
            class="text-sm leading-5 text-sky-dark group-hover:text-gray-900 dark:group-hover:text-secondary-lighter dark:text-white font-medium"
          >{{ numberFormat(module.downloads) }}</div>
        </a>
        <a
          :href="module.github"
          aria-label="stars"
          target=" _blank"
          rel="noopener"
          class="stats-block w-full group flex justify-between py-3 px-4 hover:bg-gray-200 dark:hover:bg-secondary hover:bg-opacity-50"
        >
          <div
            class="text-sm leading-5 text-sky-dark dark:text-white group-hover:text-gray-900 dark:group-hover:text-secondary-lighter font-medium truncate"
          >
            {{ numberFormat(module.stars) }}
            <span
              class="hidden md:inline-block"
            >star{{ module.stars !== 1 ? 's' : '' }}</span>
          </div>
          <img alt="stars" src="~/assets/icons/star.svg" width="20" height="20" class="icon">
        </a>
      </div>
      <div
        class="stats-block rounded-b-lg group flex justify-between py-3 px-4 z-0 overflow-hidden hover:bg-gray-200 dark:hover:bg-secondary hover:bg-opacity-50"
      >
        <div class="flex space-x-2">
          <a
            v-for="maintainer of module.maintainers"
            :key="maintainer.github"
            v-tooltip="{ content: maintainer.github, classes: ['bg-secondary-dark', 'text-white', 'px-2', 'py-1', 'rounded', 'text-sm'] }"
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
    compatibility () {
      return Object.entries(this.module.compatibility || {})
        .map(([key, status]) => ({ ...this.statusMap[status], label: key }))
    }
  },
  methods: {
    numberFormat (num, options = { precision: 1 }) {
      return numberFormatter(num, options)
    },
    iconUrl ({ icon, category }) {
      if (icon) {
        return `/icons/${icon}`
      }
      return `/categories/${category.toLowerCase()}.svg`
    },
    npmUrl ({ npm }) {
      return `https://npmjs.com/package/${npm}`
    },
    githubUrl ({ github }) {
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
