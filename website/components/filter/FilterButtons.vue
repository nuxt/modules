<template>
  <div>
    <h2
      class="
        text-2xl
        font-extrabold
        tracking-tight
        text-sky-darkest
        dark:text-sky-lightest
      "
    >
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
          focus:outline-none
        "
        :class="
          selectedItem === item.key
            ? 'bg-sky-darker text-sky-lightest'
            : 'text-sky-darkest bg-white border border-gray-300 dark:border-sky-dark dark:bg-secondary-darkest dark:text-sky-surface hover:text-sky-lightest hover:bg-sky-dark transition-colors duration-150 ease-in-out focus:bg-sky-lightest'
        "
        @click="$emit('toggle', item.key)"
      >
        <slot name="icon" :icon="item.icon">
          <UnoIcon class="text-lg" :class="item.icon" />
        </slot>
        <span class="flex-auto ml-3">{{ item.label }}</span>
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
