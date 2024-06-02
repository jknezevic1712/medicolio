<template>
  <section>
    <base-card title="Your profile">
      <!-- <base-form :data="formData" :submitFn="handleFormSubmit" :resetFn="handleFormReset" /> -->
      <div class="form-container">
        <form id="doctor-profile-form" class="form" @submit.prevent="handleFormSubmit">
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
        </form>

        <div class="form-actions">
          <base-button type="reset" @click="handleFormReset">Reset</base-button>
          <base-button type="submit" form="doctor-profile-form">Submit</base-button>
        </div>
      </div>
    </base-card>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// utils
import { useDoctorStore } from '@/stores/useDoctorStore'
// types
import type { FormDataProps } from '@/assets/types/General'

const doctorStore = useDoctorStore()
const doctorPin = ref(doctorStore.doctor!.PIN)
const doctorName = ref(doctorStore.doctor!.name)
const doctorTitle = ref(doctorStore.doctor!.title)

const formData: FormDataProps[] = [
  {
    input: doctorPin,
    emitName: 'doctor-pin',
    label: 'PIN',
    disabled: true
  },
  {
    input: doctorName,
    emitName: 'doctor-name',
    label: 'Name',
    required: true
  },
  {
    input: doctorTitle,
    emitName: 'doctor-title',
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

// import { onBeforeMount } from 'vue'
// ? Some fetching might be need to be done to fetch doctor's extra data
// onBeforeMount(async () => {
//   const res = await fetchMedications()
//   setDrugs(res)
//   setDoctor(DUMMY_DATA.doctors[0])
// })
</script>

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
  justify-content: space-between
  align-items: center
  gap: 2rem
  padding: 1rem
  input
    border: 2px solid $base-color-3
    border-radius: 0.25rem
    outline: 2px solid transparent
    padding: 0.25rem
    transition: all 150ms ease-out
  input:hover
    border-color: $base-color-2
  input:disabled
    background-color: $base-color-4-rgba
  input:focus, textarea:focus
    outline: 2px solid $base-color-2
    border-color: $base-color-2
  input[type='checkbox']
    display: inline
    width: auto
    border: none
  input[type='checkbox']:focus
    outline: $base-color-2 solid 1px
.form-actions
  width: 100%
  display: flex
  justify-content: flex-end
  align-items: center
  gap: 0.5rem
</style>
