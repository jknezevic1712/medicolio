import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
// utils
import { useRouter } from 'vue-router'
// types
import type { Doctor } from '@/assets/types/General'

const useAuthStore = defineStore(
  'auth',
  () => {
    const router = useRouter()

    const user = ref<Doctor | null>(null)
    function setUser(payload: Partial<Doctor>) {
      user.value = {
        ...user.value,
        ...(payload as Doctor)
      }
    }
    function logoutUser() {
      user.value = null
      router.push('/auth')
    }

    const hasPatients = computed(() => user.value!.patients.length > 0)
    const patientsList = computed(() => [...user.value!.patients])

    return {
      user,
      hasPatients,
      patientsList,
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
