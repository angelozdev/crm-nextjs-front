import { RegisterOptions } from 'react-hook-form'

export interface Field {
  name: string
  type: string
  placeholder: string
  rules: RegisterOptions
  autoComplete: string
}

export interface Client {
  id: string
  first_name: string
  last_name: string
  company: string
  email: string
  seller: {
    id: string
    first_name: string
    createdAt: number
  }
}

export interface User {
  id: string
  first_name: string
  last_name: string
  company: string
  email: string
  createdAt: Date
  updatedAt: Date
}
