import { Field, emailRegex } from 'types'

const loginFields: Field[] = [
  {
    name: 'email',
    type: 'text',
    placeholder: 'Enter your email',
    rules: {
      required: {
        value: true,
        message: 'This field can not be blank.'
      },
      pattern: {
        value: emailRegex,
        message: 'This email is invalid.'
      }
    },
    autoComplete: 'email'
  },
  {
    name: 'password',
    type: 'password',
    autoComplete: 'current-password',
    placeholder: 'Enter your password',
    rules: {
      required: {
        value: true,
        message: 'This field can not be blank.'
      },
      minLength: {
        value: 5,
        message: 'This field must be at least 5 characters long.'
      }
    }
  }
]

export default loginFields