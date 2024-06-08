import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
// types
import type { Doctor, Patient } from '@/assets/types/DoctorData'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<Doctor | null>(null)
    const hasPatients = computed(() => user.value!.patients.length > 0)
    const patientsList = computed(() => {
      return user.value!.patients.map((patient: Patient) => {
        return patient
      })
    })
    function setUser(data: Doctor) {
      localStorage.setItem('medicolio-userData', JSON.stringify(data))

      user.value = data
    }

    return { user, hasPatients, patientsList, setUser }
  },
  {
    persist: {
      storage: localStorage,
      key: 'medicolio-auth'
    }
  }
)
