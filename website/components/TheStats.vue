<template>
  <div class="max-w-4xl">
    <dl class="grid grid-cols-2 sm:grid-cols-3 gap-6">
      <div class="flex-col space-y-2">
        <dd
          id="item-1"
          class="order-1 font-normal leading-6 text-sky-light sm:mt-2 sm:text-sm sm:capitalize"
        >Total</dd>
        <dd
          class="order-2 text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-700 leading-none sm:text-6xl"
          aria-describedby="item-1"
        >{{ modules.length }}</dd>
        <dt
          id="item-1"
          class="order-3 font-normal leading-6 text-sky-light sm:mt-2 sm:text-sm sm:capitalize"
        >modules</dt>
      </div>
      <div class="flex-col space-y-2">
        <dd
          id="item-1"
          class="order-1 font-normal leading-6 text-sky-light sm:mt-2 sm:text-sm sm:capitalize"
        >Total</dd>
        <dd
          class="order-2 text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-700 leading-none sm:text-6xl"
        >{{ numberFormat(downloadsTotal) }}</dd>
        <dt
          class="order-3 font-medium leading-6 text-sky-light sm:mt-2 sm:text-sm sm:capitalize"
        >downloads last 30 days</dt>
      </div>
      <div class="flex-col space-y-2">
        <dd
          id="item-1"
          class="order-1 font-normal leading-6 text-sky-light sm:mt-2 sm:ml-0 sm:text-sm sm:capitalize"
        >Total</dd>
        <dd
          class="order-2 text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-700 leading-none sm:text-6xl"
        >{{ maintainersTotal }}</dd>
        <dt
          class="order-3 font-medium leading-6 text-sky-light sm:mt-2 sm:text-sm sm:capitalize"
        >maintainers</dt>
      </div>
    </dl>
  </div>
</template>

<script>
import { numberFormatter } from '~/utils/format.ts'

export default defineComponent({
  props: {
    modules: {
      type: Array,
      required: true
    },
    maintainersTotal: {
      type: Number,
      required: true
    },
    downloadsTotal: {
      type: Number,
      required: true
    }
  },
  methods: {
    numberFormat(num, options = { precision: 1 }) {
      return numberFormatter(num, options)
    }
  }
})
</script>
