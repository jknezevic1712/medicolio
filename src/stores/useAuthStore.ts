import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
// utils
import { useRouter } from 'vue-router'
// types
import type { Doctor, Patient } from '@/assets/types/General'

const useAuthStore = defineStore(
  'auth',
  () => {
    const router = useRouter()

    const user = ref<Doctor | null>(null)
    function setUser(payload: Partial<Doctor>) {
      user.value = payload as Doctor
    }
    function logoutUser() {
      user.value = null
      router.push('/auth')
    }

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

      localStorage.setItem('medicolio-userData', JSON.stringify(user.value))
    }

    return {
      user,
      hasPatients,
      patientsList,
      managePatient,
      logoutUser,
      setUser
    }
  },
  {
    persist: {
      storage: localStorage,
      key: 'medicolio-auth'
    }
  }
)

export default useAuthStore
