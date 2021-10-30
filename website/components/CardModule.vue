<template>
  <div class="flex flex-col h-full">
    <div class="relative flex flex-1 flex-col space-y-2 px-6 py-8 group">
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

      <nuxt-img
        :src="iconUrl(module)"
        :alt="module.name"
        class="w-10 h-10 object-contain"
        width="40px"
        height="40px"
      />

      <h2 class="flex text-2xl items-center pt-2">
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
      <p class="text-gray-500 group-hover:text-gray-800 text-sm">{{ module.description }}</p>
    </div>
    <div class="grid grid-cols-3 opacity-100 sm:opacity-50 group-hover:opacity-100 ">
      <div
        v-for="c of compatibility"
        :key="c.label"
        class="flex flex-col items-center py-3 px-4 pl-6"
      >
        <div class="flex flex-col items-center justify-between text-2xl w-full px-2 py-1">
          {{ c.icon }}
          <span
            class="text-gray-900 text-center font-extrabold text-xs py-0.5 mt-4"
          >{{ c.label }}</span>
        </div>
      </div>
    </div>
    <div
      class="border-t border-gray-200 bg-gray-100 grid grid-cols-3 opacity-100 sm:opacity-50 group-hover:opacity-100 "
    >
      <a
        :href="npmUrl(module)"
        aria-label="npm"
        target=" _blank"
        rel="noopener"
        class="stats-block group flex items-center space-x-2 border-r border-gray-200 hover:bg-gray-200 hover:bg-opacity-50 py-3 px-4 pl-6"
      >
        <img alt="npm" src="~/assets/icons/npm.svg" width="32" height="32" class="icon" />
        <div
          class="text-sm leading-5 text-gray-600 group-hover:text-gray-900 font-medium"
        >{{ numberFormat(module.downloads) }}</div>
      </a>
      <a
        :href="module.github"
        aria-label="stars"
        target=" _blank"
        rel="noopener"
        class="stats-block group flex items-center space-x-1 py-3 px-4 border-r border-gray-200 hover:bg-gray-200 hover:bg-opacity-50"
      >
        <img alt="stars" src="~/assets/icons/star.svg" width="20" height="20" class="icon" />
        <div class="text-sm leading-5 text-gray-600 group-hover:text-gray-900 font-medium truncate">
          {{ numberFormat(module.stars) }}
          <span
            class="hidden md:inline-block"
          >star{{ module.stars !== 1 ? 's' : '' }}</span>
        </div>
      </a>
      <div
        class="stats-block group flex items-center space-x-1 py-3 px-4 z-0 overflow-hidden hover:bg-gray-200 hover:bg-opacity-50"
      >
        <img
          alt="maintainer"
          src="~/assets/icons/maintainer.svg"
          width="20"
          height="20"
          class="icon mr-1"
        />
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
            width="24"
            height="24"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { numberFormatter } from '~/utils/format.ts'

export default {
  name: 'CardModule',
  props: {
    module: {
      type: Object,
      required: true
    }
  },
  computed: {
    statusMap() {
      return {
        working: { statusText: 'Working', icon: '✅', color: '#003c3c' },
        wip: { statusText: 'Work in progress', icon: '🚧', color: '#E9C600' },
        unknown: { statusText: 'Unknown', icon: '❓', color: 'grey' },
        broken: { statusText: 'Not working', icon: '❗', color: '#ff6446' },
        rip: { statusText: 'Won\'t be supported', icon: '❌', color: '#ff6446' }
      }
    },
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
