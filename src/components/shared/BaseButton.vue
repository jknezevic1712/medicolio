<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    to?: string
    color?: 'primary' | 'destructive'
    disabled?: boolean
  }>(),
  {
    color: 'primary',
    disabled: false
  }
)

const btnClasses = computed(() => ({
  primary: props.color === 'primary',
  destructive: props.color === 'destructive',
  disabled: props.disabled
}))
</script>

<template>
  <router-link v-if="props.to" :to="props.to">
    <button class="base" :class="btnClasses">
      <slot />
    </button>
  </router-link>

  <button v-else class="base" :class="btnClasses">
    <slot />
  </button>
</template>

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
    color: $base-color-4
    background-color: $base-color-2

.destructive
    color: $base-color-1
    background-color: $base-color-destructive

    &:hover
      color: $base-color-1
      background-color: $base-color-destructive-2

.disabled
  color: $base-color-1
  background-color: $base-color-4-dimmed
  cursor: not-allowed

  &:hover
    color: $base-color-1
    background-color: $base-color-4-dimmed
</style>
