<template>
  <div class="flex items-center text-forest-night">
    <label
      for="options-menu"
      class="mr-3"
      @click="toggleOrderByMenu"
    >Order by</label>
    <div class="flex border border-gray-400/20 rounded-md">
      <div class="relative w-28 my-auto">
        <button
          type="button"
          :aria-label="`change sort`"
          class="flex items-center justify-center w-full p-1 px-2 hover:bg-sky-lightest focus:bg-sky-lightest focus:outline-none hover:border-grey-light"
          @click="toggleOrderByMenu"
        >
          {{ currentOrderByLabel }}
        </button>
        <div
          v-show="displayOrderByMenu"
          class="absolute left-0 z-10 origin-top-right rounded-b-md shadow-lg border border-gray-400/20 shadow-xs bg-white dark:bg-secondary-darkest"
        >
          <div
            id="options-menu"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              v-for="(option, key) of orderByFieldsExceptCurrent"
              :key="key"
              type="button"
              :aria-label="`sort by ${key}`"
              class="flex items-center justify-center p-1 px-2 w-28 focus:text-grey-darkest text-forest-night focus:outline-none rounded-b-md"
              @click="selectOrderBy(key)"
            >
              {{ option }}
            </button>
          </div>
        </div>
      </div>
      <div class="relative">
        <button
          type="button"
          :aria-label="sortBy === 'asc' ? 'sort ascending' : 'sort descending'"
          class="flex items-center p-2 hover:bg-sky-lightest focus:bg-sky-lightest focus:outline-none rounded-r-md"
          @click="toggleSortBy"
        >
          <UnoIcon :class="sortBy === 'asc' ? 'i-carbon-sort-ascending' : 'i-carbon-sort-descending'" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ORDER_BY_FIELDS } from '~/composables/constants'

const props = defineProps<{ sortBy: string, orderBy: string }>()
const emit = defineEmits<{(...args:any[]): void }>()

const displayOrderByMenu = ref<boolean>(false)

const currentOrderByLabel = computed<string>(() => ORDER_BY_FIELDS[props.orderBy])

const orderByFieldsExceptCurrent = computed<{ }>(() => {
  const result = { ...ORDER_BY_FIELDS }
  delete result[props.orderBy]
  return result
})

const orderByModel = computed({
  get () {
    return props.orderBy
  },
  set (orderBy) {
    emit('update:order-by', orderBy)
  }
})
const sortByModel = computed({
  get () {
    return props.sortBy
  },
  set (sortBy) {
    emit('update:sort-by', sortBy)
  }
})

const selectOrderBy = (field): void => {
  orderByModel.value = field
  displayOrderByMenu.value = false
}

const toggleOrderByMenu = (): void => {
  displayOrderByMenu.value = !displayOrderByMenu.value
}

const toggleSortBy = (): void => {
  sortByModel.value = (sortByModel.value === 'asc') ? 'desc' : 'asc'
}
</script>
