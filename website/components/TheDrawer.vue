<script setup lang="ts">
const props = defineProps<{
  open: boolean,
  enabled: boolean,
  drawerClass: string,
}>()
const emit = defineEmits<{(e: 'close'): void }>()

const classContainer = computed(() => {
  if (!props.enabled) {
    return ''
  }
  return [
    'fixed inset-0 z-100 transition duration-200',
    props.open
      ? 'opacity-100'
      : 'opacity-0 pointer-events-none'
  ].join(' ')
})

const classDrawer = computed(() => {
  if (!props.enabled) {
    return ''
  }
  return [
    'transition duration-200 transform',
    props.drawerClass || '',
    props.open
      ? 'translate-x-0'
      : '-translate-x-full'
  ]
})
</script>

<template>
  <div :class="classContainer">
    <div v-show="enabled" class="absolute inset-0 flex-auto bg-black/60 -z-1" @click="emit('close')" />
    <div :class="classDrawer">
      <slot />
    </div>
  </div>
</template>
