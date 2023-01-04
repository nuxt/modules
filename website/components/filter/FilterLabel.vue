<template>
  <span class="inline-flex items-center nuxt-card-bg px-3 py-1 nuxt-card-border rounded-full text-sm select-none">
    <slot />
    <UnoIcon
      class="i-carbon-close text-lg ml-2 -mr-1 opacity-50 hover:opacity-100 cursor-pointer"
      @click="$emit('close')"
    />
  </span>
</template>
