<template>
  <div class="card">
    <h1 v-if="props.title">{{ props.title }}</h1>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()
</script>

<style lang="sass" scoped>
.card
  border-radius: 12px
  box-shadow: 0 2px 8px $base-color-4-rgba
  padding: 1rem
  margin: 2rem auto
  max-width: 80rem

  h1
    margin: 0 0 3rem 0
    width: 100%
    display: flex
    justify-content: center
    @media screen and (min-width: $breakpoint-md)
      justify-content: flex-start
</style>
