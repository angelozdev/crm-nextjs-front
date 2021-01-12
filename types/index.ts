import { RegisterOptions } from 'react-hook-form'

export interface Field {
  name: string
  type: string
  placeholder: string
  rules: RegisterOptions
  autoComplete: string
}
