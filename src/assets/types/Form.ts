import type { Ref } from 'vue'

export type FormDataProps = {
  input: Ref<any>
  emitName: string
  label: string
  disabled?: boolean
  required?: boolean
}
