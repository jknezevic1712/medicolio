export type PatientPrescribtion = {
  id: number
  name: string
  date_until: string
}

export type Patient = {
  id: number
  name: string
  PIN: string
  diagnosis: string
  prescribtions: PatientPrescribtion[]
}

export type Doctor = {
  id: number
  name: string
  title: string
  patients: Patient[]
}
