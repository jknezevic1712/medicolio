import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
// types
import type { Doctor, Patient } from '@/assets/types/DoctorData'

export const useDoctorStore = defineStore('doctors', () => {
  const doctors = ref<Doctor[]>([])
  function setDoctors(data: Doctor[]) {
    doctors.value = data
  }

  const doctor = ref<Doctor | null>(null)
  const hasPatients = computed(() => doctor.value!.patients.length > 0)
  const patientsList = computed(() => {
    return doctor.value!.patients.map((patient: Patient) => {
      return patient
    })
  })
  function setDoctor(data: Doctor) {
    doctor.value = data
  }

  return { doctors, setDoctors, doctor, hasPatients, patientsList, setDoctor }
})
