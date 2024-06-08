<template>
  <form id="base-form" class="form">
    <!-- <base-form-control :key="idx" v-for="(item, idx) in data" :item="item" /> -->
    <span :key="idx" v-for="(item, idx) in props.data" class="form-control">
      <label :for="item.label">{{ item.label }}:</label>
      <input
        :id="item.label"
        type="text"
        disabled
        :value="item.input.value"
        @input="handleChange"
      />
    </span>
  </form>

  <div>
    <button type="submit" @click="submitFn">Submit</button>
    <button type="reset" v-if="resetFn" @click="resetFn">Reset</button>
  </div>
</template>

<script setup lang="ts">
// types
import type { FormDataProps } from '@/assets/types/General'

const props = defineProps<{
  data: FormDataProps[]
  submitFn: () => void
  resetFn?: () => void
}>()

const emit = defineEmits<{
  (e: string, value: any): void
}>()

function handleChange(e: any) {
  console.log('E ', e.target.value)
}
</script>

<style lang="sass" scoped>
.form
  width: 100%
  display: flex
  flex-direction: column
  align-items: center

.form > .form-control
  width: 100%
  display: flex
  justify-content: space-between
  align-items: center
  gap: 2rem
  padding: 1rem

.form > .form-control > input
  border: 1px solid $base-color-3
  border-radius: 0.25rem
  padding: 0.25rem

.form > .form-control > input:disabled
  background-color: $base-color-4-dimmed
</style>
