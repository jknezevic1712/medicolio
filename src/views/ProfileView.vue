<script setup lang="ts">
import { ref } from 'vue'
// utils
import { useAuthStore } from '@/stores/useAuthStore'
// types
import type { FormDataProps } from '@/assets/types/General'

const authStore = useAuthStore()
const userPin = ref(authStore.user!.PIN)
const userName = ref(authStore.user!.name)
const userTitle = ref(authStore.user!.title)

const formData: FormDataProps[] = [
  {
    input: userPin,
    emitName: 'user-pin',
    label: 'PIN',
    disabled: true
  },
  {
    input: userName,
    emitName: 'user-name',
    label: 'Name',
    required: true
  },
  {
    input: userTitle,
    emitName: 'user-title',
    label: 'Title',
    required: true
  }
]

function handleFormReset() {
  return
}

function handleFormSubmit() {
  return
}
</script>

<template>
  <section>
    <base-card title="Your profile">
      <!-- <base-form :data="formData" :submitFn="handleFormSubmit" :resetFn="handleFormReset" /> -->
      <div class="form-container">
        <form id="profile-form" class="form" @submit.prevent="handleFormSubmit">
          <!-- <base-form-control :key="idx" v-for="(item, idx) in data" :item="item" /> -->
          <span :key="idx" v-for="(control, idx) in formData" class="form-control">
            <label :for="control.label">{{ control.label }}:</label>
            <input
              :id="control.label"
              type="text"
              :disabled="control.disabled"
              :required="control.required"
              v-model="control.input.value"
            />
          </span>
          <div class="form-actions">
            <base-button type="reset" @click="handleFormReset" color="destructive"
              >Reset</base-button
            >
            <base-button type="submit">Submit</base-button>
          </div>
        </form>
      </div>
    </base-card>
  </section>
</template>

<style lang="sass" scoped>
.form-container
  width: 100%
  display: flex
  flex-direction: column
  align-items: center
  gap: 1rem
.form
  width: 100%
  display: flex
  flex-direction: column
  align-items: center

  @media screen and (min-width: $breakpoint-md)
    max-width: 30rem
.form > .form-control
  width: 100%
  display: flex
  flex-direction: column
  justify-content: center
  gap: 0.25rem
  padding: 0.5rem 0

  input
    border: 2px solid $base-color-3
    border-radius: 0.25rem
    outline: 2px solid transparent
    padding: 0.25rem
    transition: all 150ms ease-out

  input:hover
    border-color: $base-color-2
  input:disabled
    background-color: $base-color-4-dimmed
  input:focus, textarea:focus
    outline: 2px solid $base-color-2
    border-color: $base-color-2
  input[type='checkbox']
    display: inline
    width: auto
    border: none
  input[type='checkbox']:focus
    outline: $base-color-2 solid 1px

  @media screen and (min-width: $breakpoint-md)
    flex-direction: row
    justify-content: space-between
    align-items: center
.form-actions
  width: 100%
  display: flex
  flex-wrap: wrap
  gap: 0.5rem
  justify-content: center
  align-items: center
  margin-top: 2rem

  button
    width: 100%

  @media screen and (min-width: $breakpoint-md)
    margin-top: 1rem
</style>
