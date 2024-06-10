export type PatientPrescribtion = {
  id: number
  name: string
  date_until: string
}

export type Patient = {
  id: string
  name: string
  PIN: string
  diagnosis: string
  prescribtions: PatientPrescribtion[]
  doctorId: string
}

export type Doctor = {
  id: string
  name: string
  PIN: string
  title: string
  patients: Patient[]
}

export type User = Doctor | Patient
