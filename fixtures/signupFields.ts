import { InputHTMLAttributes } from 'react'

interface SignupField extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const signupFields: SignupField[] = [
  {
    type: 'text',
    placeholder: 'Enter your first name',
    name: 'first_name',
    label: 'First name'
  },
  {
    type: 'text',
    placeholder: 'Enter your last name',
    name: 'last_name',
    label: 'Last name'
  },
  {
    type: 'email',
    placeholder: 'Enter your email',
    name: 'email',
    label: 'Email'
  },
  {
    type: 'password',
    placeholder: 'Enter your password',
    name: 'password',
    label: 'Password'
  },
  {
    type: 'password',
    placeholder: 'Confirm your password',
    name: 'confirm_password',
    label: 'Confirm password'
  }
]

export default signupFields
