<script setup lang="ts">
// components
import ListItem from './ListItem.vue'
// utils
import useAuthStore from '@/stores/useAuthStore'
// types
import type { Patient } from '@/assets/types/DoctorData'

const emit = defineEmits<{
  'manage-patient': [data: Patient]
}>()
const authStore = useAuthStore()
</script>

<template>
  <div class="list" v-if="authStore.user">
    <list-item
      :key="patient.PIN"
      v-for="patient in authStore.patientsList"
      @click="emit('manage-patient', patient)"
    >
      <p>{{ patient.name }}</p>
      <p>{{ patient.PIN }}</p>
    </list-item>
  </div>
</template>

<style lang="sass" scoped>
.list
  width: 100%
  max-width: 50rem
  display: flex
  flex-direction: column
  gap: 0.5rem

  p:first-child
    font-weight: bold
</style>
