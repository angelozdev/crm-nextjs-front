import { RegisterOptions } from 'react-hook-form'

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export interface Field {
  name: string
  type: string
  placeholder: string
  rules: RegisterOptions
  autoComplete: string
}

export interface Client {
  id: string
  phone_number: number
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

export type GetMyClients = { getMyClients: Client[] }
