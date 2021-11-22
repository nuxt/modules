<script setup lang="ts">
const props = defineProps<{
  open: boolean,
  enabled: boolean,
  drawerClass: string,
}>()
const emit = defineEmits<{(e: 'close'): void }>()

const enabledDebounce = useDebounce(toRef(props, 'enabled'), 300, {})
const mounted = ref(false)

onMounted(() => {
  setTimeout(() => {
    mounted.value = true
  }, 300)
})

const classContainer = computed(() => {
  if (!props.enabled) {
    return ''
  }
  return [
    'fixed inset-0 z-100',
    enabledDebounce.value && mounted.value
      ? 'transition duration-200'
      : 'transition-none',
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
    'transform',
    enabledDebounce.value && mounted.value
      ? 'transition duration-200'
      : 'transition-none',
    props.drawerClass || '',
    props.open
      ? 'translate-x-0'
      : '-translate-x-full'
  ]
})
</script>

<template>
  <div :class="classContainer">
    <div v-show="enabledDebounce" class="absolute inset-0 flex-auto bg-black/60 -z-1" @click="emit('close')" />
    <div :class="classDrawer">
      <slot />
    </div>
  </div>
</template>
