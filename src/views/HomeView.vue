<template>
  <section>
    <base-card title="Your patients">
      <patients-list />
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

<style lang="sass" scoped></style>
