import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
// utils
import { useRouter } from 'vue-router'
// types
import type { Doctor, Patient } from '@/assets/types/DoctorData'

let timer: undefined | NodeJS.Timeout

export const useAuthStore = defineStore(
  'auth',
  () => {
    const router = useRouter()

    const user = ref<Doctor | null>(null)

    const hasPatients = computed(() => user.value!.patients.length > 0)
    const patientsList = computed(() => {
      return user.value!.patients.map((patient: Patient) => {
        return patient
      })
    })

    function authUser(data: Doctor, isLogin: boolean) {
      // TODO: actions for login/register
      const expiresIn = 2600000
      const expirationDate = new Date().getTime() + expiresIn * 1000

      timer = setTimeout(() => {
        logoutUser()
      }, expiresIn)

      localStorage.setItem('medicolio-userData', JSON.stringify(data))
      localStorage.setItem('medicolio-tokenExpiration', expirationDate.toString())
      user.value = data

      router.push('/')
    }

    function autoLoginUser() {
      const userData = localStorage.getItem('medicolio-userData')
      const tokenExpiration = localStorage.getItem('medicolio-tokenExpiration')
      if (!userData || !tokenExpiration) return

      const expiresIn = +tokenExpiration - new Date().getTime()
      if (expiresIn < 10000) {
        return
      }

      timer = setTimeout(() => {
        logoutUser()
      }, expiresIn)

      authUser(JSON.parse(userData), true)
    }

    function logoutUser() {
      clearTimeout(timer)

      localStorage.removeItem('medicolio-userData')
      localStorage.removeItem('medicolio-tokenExpiration')
      user.value = null

      router.push('/auth')
    }

    return { user, hasPatients, patientsList, authUser, autoLoginUser, logoutUser }
  },
  {
    persist: {
      storage: localStorage,
      key: 'medicolio-auth'
    }
  }
)
