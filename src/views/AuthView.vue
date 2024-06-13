<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, reactive, ref } from 'vue'
// utils
import useAPI from '@/api/useApi'

const router = useRouter()
const api = useAPI()

const isLoading = ref(false)
const formData = reactive({
  email: '',
  password: '',
  isLoginMode: true,
  name: '',
  title: '',
  pin: ''
})

const authModeInfo = computed(() =>
  formData.isLoginMode ? "Don't have an account yet?" : 'Already have an account?'
)
const submitBtnTooltip = computed(() => (formData.isLoginMode ? 'Login' : 'Register'))

function handleAuthModeChange() {
  formData.isLoginMode = !formData.isLoginMode
}
async function handleFormSubmit() {
  isLoading.value = true

  try {
    await api.authUser(formData, formData.isLoginMode)
    isLoading.value = false

    router.push('/')
  } catch (err) {
    isLoading.value = false
    console.log('Error submitting the form: ', err)
  }
}
</script>

<template>
  <section>
    <base-dialog fixed :show="isLoading" title="Authenticating...">
      <base-spinner />
    </base-dialog>

    <base-card title="Authentication">
      <div class="form-container">
        <form id="auth-form" class="form" @submit.prevent="handleFormSubmit">
          <template v-if="!formData.isLoginMode">
            <span class="form-control">
              <label for="name">Name:</label>
              <input id="name" type="text" autocomplete="name" required v-model="formData.name" />
            </span>
            <span class="form-control">
              <label for="pin">PIN:</label>
              <input id="pin" type="text" autocomplete="pin" required v-model="formData.pin" />
            </span>
            <span class="form-control">
              <label for="title">Title:</label>
              <input
                id="title"
                type="text"
                autocomplete="title"
                required
                v-model="formData.title"
              />
            </span>
          </template>
          <span class="form-control">
            <label for="email">Email:</label>
            <input id="email" type="email" autocomplete="email" required v-model="formData.email" />
          </span>
          <span class="form-control">
            <label for="password">Password:</label>
            <input
              id="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="formData.password"
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
