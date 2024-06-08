<template>
  <section class="list" v-if="doctorStore.doctor">
    <list-item :key="patient.PIN" v-for="patient in doctorStore.patientsList">
      <p>{{ patient.name }}</p>
      <p>{{ patient.PIN }}</p>
    </list-item>
  </section>
</template>

<script setup lang="ts">
// components
import ListItem from './ListItem.vue'
// utils
import { useDoctorStore } from '@/stores/useDoctorStore'

const doctorStore = useDoctorStore()
</script>

<style lang="sass" scoped>
.list
  width: 100%
  max-width: 50rem
  display: flex
  flex-direction: column
  gap: 0.5rem
</style>
