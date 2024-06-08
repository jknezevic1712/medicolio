<template>
  <router-link v-if="props.to" :to="props.to">
    <button class="base" :class="btnColor">
      <slot />
    </button>
  </router-link>

  <button v-else class="base" :class="btnColor">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    to?: string
    color?: 'primary' | 'destructive'
  }>(),
  {
    color: 'primary'
  }
)

const btnColor = computed(() => ({
  primary: props.color === 'primary',
  destructive: props.color === 'destructive'
}))
</script>

<style lang="sass" scoped>
.base
  cursor: pointer
  padding: 0.6rem 1.15rem
  border-radius: 0.25rem
  transition: all 150ms ease-out

.base > a
  text-decoration: none
  color: inherit

.primary
  color: $base-color-1
  background-color: $base-color-3

  &:hover
    background-color: $base-color-2
    color: $base-color-4

.destructive
    color: $base-color-1
    background-color: $base-color-destructive

    &:hover
      background-color: $base-color-destructive-2
      color: $base-color-1
</style>
