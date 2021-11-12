<template>
  <div>
    <dl class="flex gap-8 mt-auto h-full">
      <div class="flex-col space-y-2 p-4 rounded-md">
        <span
          class="font-normal leading-6 text-sky-darkest dark:text-sky-lightest text-sm sm:mt-2 sm:text-sm sm:capitalize"
          aria-hidden="true"
        >Total</span>
        <dd
          class="text-3xl font-black text-primary-600 leading-none sm:text-6xl"
          aria-describedby="item-1"
        >
          {{ modules.length }}
        </dd>
        <dt
          id="item-1"
          class="font-normal leading-6 text-sky-darkest dark:text-sky-lightest text-sm sm:mt-2 sm:text-sm sm:capitalize"
        >
          modules
        </dt>
      </div>
      <div class="flex-col space-y-2 p-4">
        <span
          class="font-normal leading-6 text-sky-darkest dark:text-sky-lightest text-sm sm:mt-2 sm:text-sm sm:capitalize"
          aria-hidden="true"
        >Total</span>
        <dd
          class="text-3xl font-black text-primary-600 leading-none sm:text-6xl"
        >
          {{ numberFormat(downloadsTotal) }}
        </dd>
        <dt
          class="font-medium leading-6 text-sky-darkest dark:text-sky-lightest text-sm sm:mt-2 sm:text-sm sm:capitalize"
        >
          downloads last 30 days
        </dt>
      </div>
      <div class="flex-col space-y-2 p-4 rounded-md">
        <span
          class="font-normal leading-6 text-sky-darkest dark:text-sky-lightest text-sm sm:mt-2 sm:text-sm sm:capitalize"
          aria-hidden="true"
        >Total</span>
        <dd
          class="text-3xl font-black text-primary-600 leading-none sm:text-6xl"
        >
          {{ maintainersTotal }}
        </dd>
        <dt
          class="font-medium leading-6 text-sm text-sky-darkest dark:text-sky-lightest sm:mt-2 sm:text-sm sm:capitalize"
        >
          maintainers
        </dt>
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
    numberFormat (num, options = { precision: 1 }) {
      return numberFormatter(num, options)
    }
  }
})
</script>
