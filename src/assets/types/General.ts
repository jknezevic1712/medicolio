export type Patient = {
  id: string
  email: string
  name: string
  pin: string
  diagnosis: string
  prescribtions: string[]
  doctorId: string
}

export type Doctor = {
  id: string
  email: string
  name: string
  pin: string
  title: string
  patients: Patient[]
}

export type User = Doctor | Patient
