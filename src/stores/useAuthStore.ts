import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
// utils
import { useRouter } from 'vue-router'
// types
import type { Doctor, Patient } from '@/assets/types/DoctorData'

let timer: undefined | NodeJS.Timeout

const useAuthStore = defineStore(
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
    function managePatient(data: Patient) {
      const patientExists = user.value?.patients.find((patient) => patient.id === data.id)

      if (!patientExists) {
        user.value?.patients.push(data)
      } else {
        user.value!.patients = user.value!.patients.map((patient) => {
          if (patient.id === data.id) {
            return data
          }
          return patient
        })
      }

      saveUserDataToLocalStorage()
    }

    function authUser(data: Doctor, isLogin: boolean) {
      // TODO: actions for login/register
      const expiresIn = 2600 * 1000
      const expirationDate = new Date().getTime() + expiresIn * 1000

      timer = setTimeout(() => {
        logoutUser()
      }, expiresIn)

      saveUserDataToLocalStorage()
      localStorage.setItem('medicolio-tokenExpiration', expirationDate.toString())
      user.value = data
    }
    function autoLoginUser() {
      const userData = localStorage.getItem('medicolio-userData')
      const tokenExpiration = localStorage.getItem('medicolio-tokenExpiration')
      if (!userData || !tokenExpiration) return

      const expiresIn = +tokenExpiration - new Date().getTime()
      const expiresInSec = Math.floor(expiresIn / 1000)
      if (expiresInSec < 10000) {
        return
      }

      timer = setTimeout(() => {
        logoutUser()
      }, expiresInSec)

      authUser(JSON.parse(userData), true)
    }
    function logoutUser() {
      clearTimeout(timer)

      localStorage.removeItem('medicolio-userData')
      localStorage.removeItem('medicolio-tokenExpiration')
      user.value = null

      router.push('/auth')
    }
    function saveUserDataToLocalStorage() {
      localStorage.setItem('medicolio-userData', JSON.stringify(user.value))
    }

    return { user, hasPatients, patientsList, managePatient, authUser, autoLoginUser, logoutUser }
  },
  {
    persist: {
      storage: localStorage,
      key: 'medicolio-auth'
    }
  }
)

export default useAuthStore
