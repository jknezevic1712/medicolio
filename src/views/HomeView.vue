<script lang="ts">
import { ref } from 'vue'
// components
import PatientsList from '@/components/home/PatientsList.vue'
import ManagePatient from '@/components/home/ManagePatient.vue'
// types
import type { Patient } from '@/assets/types/General'

export default {
  components: {
    PatientsList,
    ManagePatient
  },
  setup() {
    const selectedPatient = ref<Patient | undefined>(undefined)
    const showDialog = ref(false)

    function handleDialogOpen() {
      showDialog.value = true
    }

    function clearSelectedPatient() {
      selectedPatient.value = undefined
    }

    function handleDialogClose(force?: boolean) {
      if (force) {
        showDialog.value = false
      } else {
        confirm('Are you sure? Any changes made will be lost.') && (showDialog.value = false)
      }
    }

    function handleManagePatient(data: Patient) {
      selectedPatient.value = data
      handleDialogOpen()
    }

    return {
      showDialog,
      handleDialogOpen,
      clearSelectedPatient,
      handleDialogClose,
      handleManagePatient,
      selectedPatient
    }
  }
}
</script>

<template>
  <section>
    <manage-patient
      :key="selectedPatient?.id"
      :showDialog="showDialog"
      @closeDialog="(forceClose) => (handleDialogClose(forceClose), clearSelectedPatient())"
      :patient="selectedPatient"
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
