import { Field, emailRegex } from 'types'

const signupFields: Field[] = [
  {
    type: 'text',
    placeholder: 'Enter your first name',
    name: 'first_name',
    rules: {
      required: {
        value: true,
        message: 'This field can not be blank.'
      },
      minLength: {
        value: 5,
        message: 'This field must be at least 5 characters long.'
      },
      maxLength: {
        value: 30,
        message: 'This field must have a maximum of 30 characters.'
      }
    },
    autoComplete: 'first-name'
  },
  {
    type: 'text',
    placeholder: 'Enter your last name',
    name: 'last_name',
    rules: {
      required: {
        value: true,
        message: 'This field can not be blank.'
      },
      minLength: {
        value: 5,
        message: 'This field must be at least 5 characters long.'
      },
      maxLength: {
        value: 30,
        message: 'This field must have a maximum of 30 characters.'
      }
    },
    autoComplete: 'last-name'
  },
  {
    type: 'email',
    placeholder: 'Enter your email',
    name: 'email',
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
    type: 'password',
    placeholder: 'Enter your password',
    name: 'password',
    rules: {
      required: {
        value: true,
        message: 'This field can not be blank.'
      },
      minLength: {
        value: 5,
        message: 'This field must be at least 5 characters long.'
      }
    },
    autoComplete: 'current-password'
  },
  {
    type: 'password',
    placeholder: 'Confirm your password',
    name: 'confirm_password',
    rules: {
      required: {
        value: true,
        message: 'This field can not be blank.'
      },
      minLength: {
        value: 5,
        message: 'This field must be at least 5 characters long.'
      }
    },
    autoComplete: 'confirm-password'
  }
]

export default signupFields
