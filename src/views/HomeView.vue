<script lang="ts">
import { ref } from 'vue'
// components
import PatientsList from '@/components/home/PatientsList.vue'
import ManagePatient from '@/components/home/ManagePatient.vue'

export default {
  components: {
    PatientsList,
    ManagePatient
  },
  setup() {
    const showDialog = ref(false)

    function handleDialogOpen() {
      showDialog.value = true
    }

    function handleDialogClose(force?: boolean) {
      if (force) {
        return (showDialog.value = false)
      }
      confirm('Are you sure? Any changes made will be lost.') && (showDialog.value = false)
    }

    return {
      showDialog,
      handleDialogOpen,
      handleDialogClose
    }
  }
}
</script>

<template>
  <section>
    <base-dialog :show="showDialog" title="Register Patient" @close="handleDialogClose">
      <manage-patient @closeDialog="handleDialogClose(true)" />
    </base-dialog>
    <base-card title="Your patients">
      <template #actions>
        <base-button class="card-action" @click="handleDialogOpen">New Patient</base-button>
      </template>
      <div class="patients-list-container">
        <patients-list />
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
