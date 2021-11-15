<script setup lang="ts">
const props = defineProps<{
  version: string,
  status: string,
}>()

const statusMap = {
  working: { statusText: 'Working', icon: '✅', color: '#348a3e50' },
  wip: { statusText: 'Work in progress', icon: '🚧', color: '#E9C60050' },
  unknown: { statusText: 'Unknown', icon: '❓', color: '#88888830' },
  broken: { statusText: 'Not working', icon: '❗', color: '#9e200650' },
  rip: { statusText: 'Won\'t be supported', icon: '❌', color: 'grey' }
}
</script>

<template>
  <div
    v-tooltip="{
      content: `${version}: ${statusMap[status].statusText}`,
      classes: ['bg-secondary-dark', 'text-white', 'px-2', 'py-1', 'rounded', 'text-sm']
    }"
    class="flex items-center justify-between text-base bg-gray-100 dark:bg-secondary-dark rounded-lg w-full px-2 py-1 z-50"
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
</template>
