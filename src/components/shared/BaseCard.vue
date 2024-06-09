<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h1 v-if="props.title">{{ props.title }}</h1>
      <slot name="actions" />
    </div>
    <slot />
  </div>
</template>

<style lang="sass" scoped>
.card
  width: 100%
  max-width: 80rem
  border-radius: 12px
  box-shadow: 0 2px 8px $base-color-4-dimmed
  padding: 1rem
  margin: 2rem auto

.card-header
  margin: 0 0 3rem 0
  width: 100%
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  @media screen and (min-width: $breakpoint-md)
    justify-content: space-between
    flex-direction: row

  h1
    margin: 0 0 1rem 0
    @media screen and (min-width: $breakpoint-md)
      margin: 0
</style>
