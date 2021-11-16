<template>
  <div class="flex flex-col h-full relative">
    <div class="relative flex flex-1 flex-col p-5 text-sky-darkest dark:text-white">
      <a
        :href="mod.website"
        :aria-label="mod.website"
        target="_blank"
        rel="noopener"
        class="absolute inset-0"
      >
        <div
          class="transition-opacity duration-200 ease-in-out rounded-full opacity-0 group-hover:opacity-100 absolute top-3 right-3 cursor-pointer"
        >
          <UnoIcon class="i-carbon-arrow-up-right text-xl leading-none !block group-hover:text-primary-800 dark:group-hover:text-white" />
        </div>
      </a>

      <div class="flex flex-col items-start w-full">
        <div class="flex w-full">
          <div
            class="border group-hover:shadow-xl transform transition-transform group-hover:-rotate-8 group-hover:border-primary-800 dark:group-hover:border-secondary-dark bg-white border-gray-200 dark:bg-secondary-dark dark:border-secondary-dark w-20 h-20 rounded-lg flex flex-none items-center justify-center"
          >
            <!-- TODO: use <nuxt-img> -->
            <img
              :src="'https://api.nuxtjs.org/api/ipx/s_80,f_webp/gh/nuxt/modules/main/website/static/' + iconUrl(mod)"
              :alt="mod.name"
              class="w-10 h-10 object-contain"
              width="40px"
              height="40px"
            >
          </div>
          <div class="ml-6">
            <h2 class="flex text-base font-semibold items-top dark:text-white h-9 line-2 leading-tight">
              <span>{{ mod.name }}</span>
              <img
                v-if="mod.type === 'official'"
                alt="official"
                src="~/assets/icons/official.svg"
                width="20"
                height="20"
                class="ml-1 mt-1"
              >
            </h2>
            <div class="grid grid-cols-3 gap-2 py-3 w-full">
              <div
                v-for="[version, status] of Object.entries(mod.compatibility)"
                :key="version"
                class="flex flex-col items-center"
              >
                <div
                  v-tooltip="{
                    content: `${statusMap[status].statusText}`,
                    classes: ['bg-secondary-dark', 'text-white', 'px-2', 'py-1', 'rounded', 'text-sm']
                  }"
                  class="flex items-center justify-between text-base bg-gray-100 dark:bg-sky-dark rounded-lg w-full px-2 py-1 z-50"
                >
                  <iconNuxt3
                    v-if="version === '3.x'"
                    class="h-6 w-6 mr-1 inline-block"
                    aria-hidden="true"
                  />
                  <iconNuxt2
                    v-if="version === '2.x'"
                    class="h-6 w-6 mr-1 inline-block"
                    aria-hidden="true"
                  />
                  <iconNuxtBridge
                    v-if="version === '2.x-bridge'"
                    class="h-6 w-6 mr-1 inline-block"
                    aria-hidden="true"
                  />
                  <span class="text-sm">
                    {{ statusMap[status].icon }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 h-24">
          <p
            class="text-sky-dark dark:text-white dark:opacity-85 text-sm font-normal line-clamp-3 mt-2"
          >
            {{ mod.description }}
          </p>
        </div>
        <div class="flex items-center justify-between w-full z-30 h-10 relative">
          <div class="flex flex-none">
            <a
              :href="npmUrl(mod)"
              aria-label="npm"
              target=" _blank"
              rel="noopener"
              class="flex whitespace-nowrap w-full mr-4 text-sky-dark hover:text-gray-400 dark:hover:text-secondary-lighter dark:text-white"
            >
              <UnoIcon class="mr-2 i-carbon-download" />
              <div
                class="text-sm leading-5 font-medium truncate"
              >{{ numberFormat(mod.downloads) }} installs</div>
            </a>
            <a
              :href="mod.github"
              aria-label="stars"
              target=" _blank"
              rel="noopener"
              class="flex whitespace-nowrap w-full mr-4 text-sky-dark hover:text-gray-400 dark:hover:text-secondary-lighter dark:text-white"
            >
              <UnoIcon class="mr-2 i-carbon-star" />
              <div
                class="text-sm leading-5 font-medium truncate"
              >
                {{ numberFormat(mod.stars) }}
                <span
                  class="hidden md:inline-block"
                >star{{ mod.stars !== 1 ? 's' : '' }}</span>
              </div>
            </a>
          </div>
          <div class="flex -space-x-5 hover:space-x-2 hover:absolute right-0 bottom-2 hover:bg-white  dark:hover:bg-secondary-darker transition duration-150 ease-linear delay-150 ">
            <a
              v-for="maintainer of mod.maintainers"
              :key="maintainer.github"
              v-tooltip="{ content: maintainer.name || maintainer.github, classes: ['bg-secondary-dark', 'text-white', 'px-2', 'py-1', 'rounded', 'text-sm', 'mb-2'] }"
              :aria-label="maintainer.github"
              :href="githubUrl(maintainer)"
              target="_blank"
              rel="noopener"
            >
              <!-- TODO: use <nuxt-img> -->
              <img
                class="w-7 h-7 flex flex-none hover:scale-150 transform hover:border-primary-800 dark:border-white transition-transform rounded-full text-white border-2 border-white shadow-solid transition-opacity duration-200 opacity-75 group-hover:opacity-100"
                :src="'https://api.nuxtjs.org/api/ipx/s_44,f_webp/gh_avatar/' + maintainer.github"
                :alt="maintainer.name"
                format="jpg"
                width="28"
                height="28"
              >
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { numberFormatter } from '~/utils/format'

defineProps({
  mod: {
    type: Object,
    required: true
  }
})

const statusMap = {
  working: { statusText: 'Working', icon: '✅', color: '#348a3e50' },
  wip: { statusText: 'Work in progress', icon: '🚧', color: '#E9C60050' },
  unknown: { statusText: 'Unknown', icon: '❓', color: '#88888830' },
  broken: { statusText: 'Not working', icon: '❗', color: '#9e200650' },
  rip: { statusText: 'Won\'t be supported', icon: '❌', color: 'grey' }
}

function numberFormat (num, options = { precision: 1 }) {
  return numberFormatter(num, options)
}

function iconUrl ({ icon, category }) {
  if (icon) {
    return `/icons/${icon}`
  }
  return `/categories/${category.toLowerCase()}.svg`
}

function npmUrl ({ npm }) {
  return `https://npmjs.com/package/${npm}`
}

function githubUrl ({ github }) {
  return `https://github.com/${github}`
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
