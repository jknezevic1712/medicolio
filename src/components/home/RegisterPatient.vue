<script lang="ts">
import useAuthStore from '@/stores/useAuthStore'
import { reactive } from 'vue'

const defaultPatientData = {
  name: '',
  PIN: '',
  diagnosis: '',
  prescribtions: []
}
export default {
  emits: ['closeDialog'],
  setup(_props, { emit }) {
    const authStore = useAuthStore()

    const formData = reactive(defaultPatientData)

    function handleFormSubmit() {
      const patientData = {
        id: Date.now(),
        name: formData.name,
        PIN: formData.PIN,
        diagnosis: formData.diagnosis,
        prescribtions: formData.prescribtions
      }

      // TODO: Save patient data to DB
      authStore.registerPatient(patientData)
      emit('closeDialog')
    }

    return { handleFormSubmit, formData }
  }
}
</script>

<template>
  <div class="form-container">
    <form id="auth-form" class="form" @submit.prevent="handleFormSubmit">
      <span class="form-control">
        <label for="name">Name:</label>
        <input id="name" type="text" autocomplete="name" required v-model="formData.name" />
      </span>
      <span class="form-control">
        <label for="PIN">PIN:</label>
        <input id="PIN" type="text" autocomplete="pin" required v-model="formData.PIN" />
      </span>
      <span class="form-control">
        <label for="diagnosis">Diagnosis:</label>
        <textarea id="diagnosis" required v-model="formData.diagnosis" />
      </span>

      <div class="form-actions">
        <base-button type="submit">Register</base-button>
      </div>
    </form>
  </div>
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
  @media screen and (min-width: $breakpoint-md)
    flex-direction: row
    justify-content: space-between
    align-items: center

  input, textarea
    border: 2px solid $base-color-3
    border-radius: 0.25rem
    outline: 2px solid transparent
    padding: 0.25rem
    transition: all 150ms ease-out
  input:hover, textarea:hover
    border-color: $base-color-2
  input:focus, textarea:focus
    outline: 2px solid $base-color-2
    border-color: $base-color-2

  textarea
    resize: none
    min-height: 150px
    @media screen and (min-width: $breakpoint-md)

  input, textarea
    max-width: 200px
    @media screen and (min-width: $breakpoint-md)
      max-width: unset
      width: 250px

.form-actions
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  margin-top: 2rem

  button
    width: 100%

  @media screen and (min-width: $breakpoint-md)
    margin-top: 1rem

.form-auth_mode
  cursor: pointer
  text-decoration: underline
  transition: all 150ms ease-out

  &:hover
    color: $base-color-2
</style>
