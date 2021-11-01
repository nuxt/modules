<template>
  <div class="container px-4 pt-12 pb-8 mx-auto sm:px-0">
    <!-- Search -->
    <div class="flex shadow-sm sm:max-w-lg sm:mx-auto">
      <label class="relative flex-1">
        <input
          ref="searchModule"
          v-model="filters.q"
          type="search"
          aria-label="Search"
          class="block w-full py-3 pl-3 pr-3 text-base leading-6 placeholder-gray-500 transition duration-150 ease-in-out border appearance-none md:pr-10 border-rainy-grey rounded-tl-md rounded-bl-md focus:ring-3 focus:ring-green-300 focus:ring-opacity-50 focus:outline-none focus:placeholder-gray-400 sm:flex-1"
          placeholder="Search a module (name, category, username, etc.)"
        >
        <span class="absolute hidden px-2 py-1 text-gray-400 border border-gray-300 rounded-md opacity-50 md:inline-block text-md top-13 right-13 leading-14">
          /
        </span>
      </label>
      <button type="button" aria-label="search" class="px-6 py-3 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-rainy-grey hover:bg-grey-light focus:bg-grey-light rounded-tr-md rounded-br-md focus:outline-none focus:ring-3 focus:ring-green-300 focus:ring-opacity-50 sm:mt-0 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto">
        <IconSearch alt="Search" />
      </button>
    </div>

    <!-- Categories -->
    <div class="flex pt-6 space-x-2 overflow-x-auto sm:flex-wrap sm:justify-center">
      <button
        v-for="category of categories"
        :key="category"
        type="button"
        :aria-label="category"
        class="px-4 py-2 mb-2 text-sm rounded cursor-pointer focus:outline-none"
        :class="[ selectedCategory === category ? 'bg-forest-night text-white' : 'text-forest-night bg-rainy-grey hover:bg-grey-light focus:bg-grey-light']"
        @click="toggleCategory(category)"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  }
}
</script>
