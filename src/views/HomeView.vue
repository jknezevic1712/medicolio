<template>
  <section>
    <base-card>
      <div class="title">
        <h1>Your patients</h1>

        <patients-list />
      </div>
    </base-card>
  </section>
</template>

<script setup lang="ts">
import PatientsList from '@/components/home/PatientsList.vue'
</script>

<style lang="sass" scoped>
.title
  display: flex
  justify-content: flex-start
  align-items: center
</style>
