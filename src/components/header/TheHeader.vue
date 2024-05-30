<template>
  <header>
    <h2 class="header-title">
      <router-link to="/">Medicolio</router-link>
    </h2>
    <nav class="nav">
      <base-button to="/">Patients</base-button>
      <base-button to="/doctor/1">Profile</base-button>
      <base-button to="/auth">Register</base-button>
    </nav>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="sass" scoped>
header
  display: flex
  justify-content: space-between
  align-items: center
  padding: 1.5rem
  border-bottom: 0.2rem solid $base-color-4

.header-title
  font-size: 2rem
  color: $base-color-3

.nav
  display: flex
  justify-content: center
  align-items: center
  gap: 0.5rem
</style>
