<script setup lang="ts"></script>

<template>
  <div class="list_item">
    <slot />
  </div>
</template>

<style lang="sass" scoped>
.list_item
  display: flex
  justify-content: space-between
  align-items: center
  padding: 1rem
  border: 1px solid $base-color-3
  border-radius: 0.25rem
  transition: all 150ms ease-out
  cursor: pointer

  &:hover
    box-shadow: 0 2px 8px $base-color-4-dimmed
    border: 1px solid $base-color-2
</style>
