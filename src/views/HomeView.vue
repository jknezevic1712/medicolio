<script setup lang="ts">
// components
import PatientsList from '@/components/home/PatientsList.vue'
</script>

<template>
  <section>
    <base-card title="Your patients">
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
</style>
