<script lang="ts">
import { reactive, ref } from 'vue'
// utils
import useAuthStore from '@/stores/useAuthStore'
import useAPI from '@/api/useApi'
import useDrugStore from '@/stores/useDrugStore'
// types
import type { PropType } from 'vue'
import type { Patient } from '@/assets/types/General'

const defaultPatientData: Omit<Patient, 'id'> = {
  doctorId: '',
  email: '',
  name: '',
  pin: '',
  diagnosis: '',
  prescribtions: []
}
export default {
  props: {
    showDialog: {
      type: Boolean,
      required: true
    },
    patient: {
      type: Object as PropType<Patient> | undefined,
      required: false
    }
  },
  emits: ['closeDialog'],
  setup(props, { emit }) {
    const authStore = useAuthStore()
    const drugStore = useDrugStore()
    const api = useAPI()

    const isLoading = ref(false)
    let form = reactive({ data: props.patient ? props.patient : defaultPatientData })

    async function handleFormSubmit() {
      isLoading.value = true

      const patientData: Patient = {
        id: props.patient ? props.patient.id : Date.now().toString(),
        name: form.data.name,
        pin: form.data.pin,
        diagnosis: form.data.diagnosis,
        prescribtions: form.data.prescribtions,
        doctorId: authStore.user!.id,
        email: form.data.email
      }

      const updatedPatients = () => {
        if (authStore.patientsList.length === 0) {
          return [patientData]
        }

        let patientExists = false

        const newPatientsList = authStore.patientsList.map((patient) => {
          if (patient.id === patientData.id) {
            patientExists = true
            return patientData
          }
          return patient
        })

        if (!patientExists) {
          newPatientsList.push(patientData)
        }

        return newPatientsList
      }

      try {
        await api.updateUser({
          patients: updatedPatients()
        })
        emit('closeDialog', true)

        isLoading.value = false
      } catch (err) {
        isLoading.value = false
        console.log('Error submitting the form: ', err)
      }
    }

    return {
      handleFormSubmit,
      form,
      drugList: drugStore.drugList,
      isLoading
    }
  }
}
</script>

<template>
  <base-dialog :onTopOfDialog="true" fixed :show="isLoading" title="Submitting...">
    <base-spinner />
  </base-dialog>

  <base-dialog :show="showDialog" title="Register Patient" @close="$emit('closeDialog')">
    <div class="form-container">
      <form id="auth-form" class="form" @submit.prevent="handleFormSubmit">
        <span class="form-control">
          <label for="name">Name:</label>
          <input id="name" type="text" autocomplete="name" required v-model="form.data.name" />
        </span>
        <span class="form-control">
          <label for="PIN">PIN:</label>
          <input id="PIN" type="text" autocomplete="pin" required v-model="form.data.pin" />
        </span>
        <span class="form-control">
          <label for="email">Email:</label>
          <input id="email" type="email" autocomplete="email" required v-model="form.data.email" />
        </span>
        <span class="form-control">
          <label for="diagnosis">Diagnosis:</label>
          <textarea id="diagnosis" required v-model="form.data.diagnosis" />
        </span>
        <span class="form-control">
          <label for="prescribtions">Prescribtions:</label>
          <select
            id="prescribtions"
            name="prescribtions"
            v-model="form.data.prescribtions"
            required
            multiple
          >
            <option :key="drug" :value="drug" v-for="drug in drugList">
              {{ drug }}
            </option>
          </select>
        </span>
      </form>
    </div>
    <template #actions>
      <div class="form-actions">
        <base-button type="submit" form="auth-form">Register</base-button>
      </div>
    </template>
  </base-dialog>
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

  input, textarea, select
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

  input, textarea, select
    width: 100%
    @media screen and (min-width: $breakpoint-md)
      width: 250px

  select
    option
      margin: 0.5rem 0
      white-space: normal
      overflow-wrap: break-word
      transition: background-color 150ms ease-out
.form-actions
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  margin-top: 2rem
  @media screen and (min-width: $breakpoint-md)
      width: fit-content
      justify-content: flex-end

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
