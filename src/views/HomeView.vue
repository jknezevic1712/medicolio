<script lang="ts">
import { ref } from 'vue'
// components
import PatientsList from '@/components/home/PatientsList.vue'
import ManagePatient from '@/components/home/ManagePatient.vue'
// types
import type { Patient } from '@/assets/types/DoctorData'

export default {
  components: {
    PatientsList,
    ManagePatient
  },
  setup() {
    const showDialog = ref(false)
    const patientData = ref<Patient | undefined>(undefined)

    function handleDialogOpen() {
      showDialog.value = true
    }

    function handleDialogClose(force?: boolean) {
      patientData.value = undefined

      if (force) {
        return (showDialog.value = false)
      }
      confirm('Are you sure? Any changes made will be lost.') && (showDialog.value = false)
    }

    function handleManagePatient(data: Patient) {
      patientData.value = data
      showDialog.value = true
    }

    return {
      showDialog,
      handleDialogOpen,
      handleDialogClose,
      handleManagePatient,
      patientData
    }
  }
}
</script>

<template>
  <section>
    <manage-patient
      :showDialog="showDialog"
      @closeDialog="handleDialogClose"
      :patientData="patientData"
    />
    <base-card title="Your patients">
      <template #actions>
        <base-button class="card-action" @click="handleDialogOpen">New Patient</base-button>
      </template>
      <div class="patients-list-container">
        <patients-list @manage-patient="handleManagePatient" />
      </div>
    </base-card>
  </section>
</template>

<style lang="sass" scoped>
.patients-list-container
  display: flex
  justify-content: center
  align-items: center

.card-action
  width: 100%
  @media screen and (min-width: $breakpoint-md)
      width: fit-content
</style>
