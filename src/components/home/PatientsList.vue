<script setup lang="ts">
// components
import ListItem from './ListItem.vue'
// utils
import { useAuthStore } from '@/stores/useAuthStore'

const authStore = useAuthStore()
</script>

<template>
  <section class="list" v-if="authStore.user">
    <list-item :key="patient.PIN" v-for="patient in authStore.patientsList">
      <p>{{ patient.name }}</p>
      <p>{{ patient.PIN }}</p>
    </list-item>
  </section>
</template>

<style lang="sass" scoped>
.list
  width: 100%
  max-width: 50rem
  display: flex
  flex-direction: column
  gap: 0.5rem
</style>
