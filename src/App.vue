<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { RouterView } from 'vue-router'
// components
import TheHeader from '@/components/header/TheHeader.vue'
// utils
import useDrugStore from '@/stores/useDrugStore'
import useAuthStore from '@/stores/useAuthStore'
import useAPI from '@/api'

const drugStore = useDrugStore()
const authStore = useAuthStore()

onBeforeMount(async () => {
  const { fetchMedications } = useAPI()
  const res = await fetchMedications()
  drugStore.setDrugs(res)

  authStore.autoLoginUser()
})
</script>

<template>
  <TheHeader />

  <RouterView v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </RouterView>
</template>

<style lang="sass">
*,
*::before,
*::after
  box-sizing: border-box
  margin: 0

html
  font-family: 'Bree Serif', serif
  font-weight: 400
  font-style: normal

body
  background-color: $base-color-1
  color: $base-color-4
  margin: 0

#app
  height: 100%
  min-height: 100vh
  display: flex
  flex-direction: column

.route-enter-from
  opacity: 0
  transform: translateY(-30px)

.route-leave-to
  opacity: 0
  transform: translateY(30px)

.route-enter-to,
.route-leave-from
  opacity: 1
  transform: translateY(0)

.route-enter-active
  transition: all 150ms ease-out

.route-leave-active
  transition: all 150ms ease-in
</style>
