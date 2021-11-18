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
        :aria-label="item"
        class="
          px-4
          py-3
          mb-2
          text-sm text-left
          flex
          items-center
          justify-between
          rounded-lg
          cursor-pointer
          nuxt-card-border
          nuxt-card-bg
          transition-colors duration-150 ease-in-out
        "
        @click="$emit('toggle', item.key)"
      >
        <slot name="icon" :icon="item.icon">
          <UnoIcon class="text-lg" :class="item.icon" />
        </slot>
        <span class="flex-auto ml-3">{{ item.label }}</span>
        <UnoIcon v-if="selectedItem === item.key" class="text-lg i-carbon-checkmark" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterButtons',
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    subtitle: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default () {
        return []
      }
    },
    selectedItem: {
      type: String,
      default: ''
    }
  }
}
</script>
