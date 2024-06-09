<script setup lang="ts">
// components
import PatientsList from '@/components/home/PatientsList.vue'
</script>

<template>
  <section>
    <base-card title="Your patients">
      <template #actions>
        <base-button class="card-action">New Patient</base-button>
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
