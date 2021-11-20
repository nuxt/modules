<template>
  <div>
    <h2 class="text-2xl font-extrabold tracking-tight">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="text-sm text-gray-700 dark:text-gray-300 mb-4">
      {{ subtitle }}
    </p>

    <div
      class="
        grid grid-cols-1
        gap-x-4 gap-y-2
        py-6
        overflow-x-auto
        sm:flex-wrap sm:justify-center
      "
    >
      <button
        v-for="item of items"
        :key="item.key"
        type="button"
        :aria-label="item.label"
        class="
          px-4
          py-3
          mb-2
          text-sm text-left
          flex gap-2
          items-center
          rounded-lg
          cursor-pointer
          nuxt-card-border
          nuxt-card-bg
          transition-colors duration-150 ease-in-out
        "
        @click="$emit('toggle', item.key)"
      >
        <slot name="icon" v-bind="item">
          <UnoIcon class="text-lg" :class="item.icon" />
        </slot>
        <div class="overflow-hidden truncate">
          {{ item.label }}
        </div>
        <slot name="badge" v-bind="item" />
        <div class="flex-auto" />
        <UnoIcon v-if="selectedItem === item.key" class="flex-none i-carbon-checkmark" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

interface Item {
  key: string
  label: string
  icon?: string
}

defineProps<{
  title: string,
  subtitle?: string,
  items: Item[],
  selectedItem?: string | null
}>()
</script>
