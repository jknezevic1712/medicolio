<script setup lang="ts">
// components
import { computed } from 'vue'
import LibraryTitle from './LibraryTitle.vue'
// utils
import useAuthStore from '@/stores/useAuthStore'
import useAPI from '@/api/useApi'

const authStore = useAuthStore()
const api = useAPI()

const userExists = computed(() => !!authStore.user)

function handleLogout() {
  api.logoutUser()
}
</script>

<template>
  <header class="header">
    <h2 class="header-title">
      <router-link to="/">Medicolio<library-title /></router-link>
    </h2>
    <nav class="nav">
      <template v-if="userExists">
        <base-button to="/">Patients</base-button>
        <base-button to="/doctor/1">Profile</base-button>
        <base-button color="destructive" @click="handleLogout">Logout</base-button>
      </template>

      <base-button v-else to="/auth">Register</base-button>
    </nav>
  </header>
</template>

<style lang="sass" scoped>
.header
  display: flex
  flex-wrap: wrap
  justify-content: center
  align-items: center
  padding: 1rem
  gap: 1rem
  border-bottom: 0.2rem solid $base-color-4

  @media screen and (min-width: $breakpoint-md)
    flex-wrap: nowrap
    justify-content: space-between
    gap: 0


.header-title
  font-size: 2rem
  color: $base-color-3

.nav
  display: flex
  justify-content: center
  align-items: center
  gap: 0.5rem
</style>
