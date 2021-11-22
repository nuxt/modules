<template>
  <div>
    <template v-if="enabled">
      <div
        class="fixed inset-0 z-100 transition duration-200"
        :class="open ? 'opacity-100': 'opacity-0 pointer-events-none'"
      >
        <div class="absolute inset-0 flex-auto bg-black/60 -z-1" @click="emit('close')" />
        <div
          class="transition duration-200 transform"
          :class="[drawerClass, open ? 'translate-x-0': '-translate-x-1/1']"
        >
          <slot />
        </div>
      </div>
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean,
  enabled: boolean,
  drawerClass: string,
}>()
const emit = defineEmits<{(e: 'close'): void }>()
</script>
