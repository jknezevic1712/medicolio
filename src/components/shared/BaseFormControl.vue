<script setup lang="ts">
// types
import type { FormDataProps } from '@/assets/types/Form'

const props = defineProps<{
  item: FormDataProps
  label: string
}>()
const emit = defineEmits<{
  (e: string, value: any): void
}>()

function handleChange(e: any) {
  console.log('E ', e.target.value)
}
</script>

<template>
  <span class="form-control">
    <label :for="label">{{ label }}:</label>
    <input :id="label" type="text" disabled :value="props.item.input.value" @input="handleChange" />
  </span>
</template>

<style lang="sass" scoped></style>
