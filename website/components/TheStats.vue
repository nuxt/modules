<template>
  <div>
    <dl class="flex gap-4 md:gap-8 mt-auto h-full">
      <div class="flex-col space-y-2 p-4 rounded-md">
        <span
          class="font-normal leading-6 text-sm sm:mt-2 sm:text-sm sm:capitalize"
          aria-hidden="true"
        >Total</span>
        <dd
          class="text-4xl font-black text-primary dark:text-primary leading-none sm:text-6xl"
          aria-describedby="item-1"
        >
          {{ stats.modules }}
        </dd>
        <dt
          id="item-1"
          class="font-normal leading-6 text-sm sm:mt-2 sm:text-sm sm:capitalize"
        >
          modules
        </dt>
      </div>
      <div class="flex-col space-y-2 p-4">
        <span
          class="font-normal leading-6 text-sm sm:mt-2 sm:text-sm sm:capitalize"
          aria-hidden="true"
        >Total</span>
        <dd
          class="text-4xl font-black text-primary dark:text-primary leading-none sm:text-6xl"
        >
          {{ numberFormatter(stats.downloads) }}
        </dd>
        <dt
          class="font-medium leading-6 text-sm sm:mt-2 sm:text-sm sm:capitalize"
        >
          downloads last 30 days
        </dt>
      </div>
      <div class="flex-col space-y-2 p-4 rounded-md">
        <span
          class="font-normal leading-6 text-sm sm:mt-2 sm:text-sm sm:capitalize"
          aria-hidden="true"
        >Total</span>
        <dd
          class="text-4xl font-black text-primary dark:text-primary leading-none sm:text-6xl"
        >
          {{ stats.contributors }}
        </dd>
        <dt
          class="font-medium leading-6 text-sm sm:mt-2 sm:text-sm sm:capitalize"
        >
          contributors
        </dt>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { numberFormatter } from '~/utils/format'
import { ModuleInfo } from '~/../lib/types'

defineProps<{
  stats: {
    contributors: number,
    downloads: number,
    modules: number
  }
}>()
</script>
