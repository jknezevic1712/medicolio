<template>
  <section>
    <base-card>
      <div class="container">
        <h1>Your patients</h1>

        <patients-list />
      </div>
    </base-card>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
// components
import PatientsList from '@/components/home/PatientsList.vue'
// utils
import { useDrugStore } from '@/stores/useDrugStore'
import { useDoctorStore } from '@/stores/useDoctorStore'
import { fetchMedications } from '@/api'
import DUMMY_DATA from '@/assets/DOCTOR_DATA'

const { setDrugs } = useDrugStore()
const { setDoctor } = useDoctorStore()

onBeforeMount(async () => {
  const res = await fetchMedications()
  setDrugs(res)
  setDoctor(DUMMY_DATA.doctors[0])
})
</script>

<style lang="sass" scoped>
.container
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  gap: 1.5rem

.container > h1
  width: 100%
  display: flex
  justify-content: center

@media screen and (min-width: $breakpoint-md)
  .container > h1
    justify-content: flex-start
</style>
