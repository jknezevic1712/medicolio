<template>
  <router-link v-if="props.to" :to="props.to">
    <button class="base">
      <slot />
    </button>
  </router-link>

  <button v-else class="base">
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  to?: string
}>()
</script>

<style lang="sass" scoped>
.base
  cursor: pointer
  padding: 0.6rem 1.15rem
  color: $base-color-1
  background-color: $base-color-3
  border-radius: 0.25rem
  transition: all 150ms ease-out

  &:hover
    background-color: $base-color-2
    color: $base-color-4

.base > a
  text-decoration: none
  color: inherit
</style>
