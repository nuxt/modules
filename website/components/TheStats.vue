<template>
  <div class="relative max-w-screen-xl px-4 mx-auto -mt-16 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <dl class="bg-white rounded-lg shadow-lg sm:grid sm:grid-cols-3">
        <div class="flex justify-center p-4 text-center border-b border-gray-100 sm:flex-col sm:p-6 sm:border-0 sm:border-r">
          <dt id="item-1" class="order-2 ml-2 font-medium leading-6 text-gray-500 sm:mt-2 sm:ml-0 sm:text-md sm:capitalize">
            modules
          </dt>
          <dd class="order-1 text-2xl font-extrabold leading-none text-green-700 sm:text-4xl" aria-describedby="item-1">
            {{ modules.length }}
          </dd>
        </div>
        <div class="flex justify-center p-4 text-center border-t border-b border-gray-100 sm:flex-col sm:p-6 sm:border-0 sm:border-l sm:border-r">
          <dt class="order-2 ml-2 font-medium leading-6 text-gray-500 sm:mt-2 sm:ml-0 sm:text-md sm:capitalize">
            downloads last 30 days
          </dt>
          <dd class="order-1 text-2xl font-extrabold leading-none text-green-700 sm:text-4xl">
            {{ numberFormat(downloadsTotal) }}
          </dd>
        </div>
        <div class="flex justify-center p-4 text-center border-t border-gray-100 sm:flex-col sm:p-6 sm:border-0 sm:border-l">
          <dt class="order-2 ml-2 font-medium leading-6 text-gray-500 sm:mt-2 sm:ml-0 sm:text-md sm:capitalize">
            maintainers
          </dt>
          <dd class="order-1 text-2xl font-extrabold leading-none text-green-700 sm:text-4xl">
            {{ maintainersTotal }}
          </dd>
        </div>
      </dl>
    </div>
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
    numberFormat (num, options = { precision: 1 }) {
      return numberFormatter(num, options)
    }
  }
})
</script>
