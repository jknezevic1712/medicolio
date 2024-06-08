<script setup lang="ts">
import { computed, reactive } from 'vue'
// utils
import useAuthStore from '@/stores/useAuthStore'

const authStore = useAuthStore()

const authData = reactive({
  username: '',
  password: '',
  isLoginMode: true
})

const authModeInfo = computed(() =>
  authData.isLoginMode ? "Don't have an account yet?" : 'Already have an account?'
)
const submitBtnTooltip = computed(() => (authData.isLoginMode ? 'Login' : 'Register'))

function handleAuthModeChange() {
  authData.isLoginMode = !authData.isLoginMode
}
function handleFormSubmit() {
  // TODO: Different data for login/register
  const formData = {
    id: Date.now(),
    name: authData.username,
    PIN: '20230696032',
    title: 'MD',
    patients: []
  }

  authStore.authUser(formData, authData.isLoginMode)
}
</script>

<template>
  <section>
    <base-card title="Authentication">
      <div class="form-container">
        <form id="auth-form" class="form" @submit.prevent="handleFormSubmit">
          <span class="form-control">
            <label for="username">Username:</label>
            <input
              id="username"
              type="text"
              autocomplete="username"
              required
              v-model="authData.username"
            />
          </span>
          <span class="form-control">
            <label for="password">Password:</label>
            <input
              id="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="authData.password"
            />
          </span>

          <div class="form-actions">
            <base-button type="submit">{{ submitBtnTooltip }}</base-button>
          </div>
        </form>

        <p class="form-auth_mode" @click="handleAuthModeChange">{{ authModeInfo }}</p>
      </div>
    </base-card>
  </section>
</template>

<style lang="sass" scoped>
.form-container
  width: 100%
  display: flex
  flex-direction: column
  align-items: center
  gap: 1rem
.form
  width: 100%
  display: flex
  flex-direction: column
  align-items: center

  @media screen and (min-width: $breakpoint-md)
    max-width: 30rem
.form > .form-control
  width: 100%
  display: flex
  flex-direction: column
  justify-content: center
  gap: 0.25rem
  padding: 0.5rem 0

  input
    border: 2px solid $base-color-3
    border-radius: 0.25rem
    outline: 2px solid transparent
    padding: 0.25rem
    transition: all 150ms ease-out

  input:hover
    border-color: $base-color-2
  input:focus
    outline: 2px solid $base-color-2
    border-color: $base-color-2

  @media screen and (min-width: $breakpoint-md)
    flex-direction: row
    justify-content: space-between
    align-items: center
.form-actions
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  margin-top: 2rem

  button
    width: 100%

  @media screen and (min-width: $breakpoint-md)
    margin-top: 1rem

.form-auth_mode
  cursor: pointer
  text-decoration: underline
  transition: all 150ms ease-out

  &:hover
    color: $base-color-2
</style>
