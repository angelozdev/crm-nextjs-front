import { Field, emailRegex } from 'types'
const createClientFields: Field[] = [
  {
    name: 'first_name',
    autoComplete: 'off',
    placeholder: "Enter the client's first name",
    rules: {
      minLength: {
        value: 2,
        message: 'This field must be at least 2 characters long.'
      },
      maxLength: {
        value: 30,
        message: 'This field must have a maximum of 30 characters'
      },
      required: {
        value: true,
        message: 'This field is required'
      }
    },
    type: 'text'
  },
  {
    name: 'last_name',
    autoComplete: 'off',
    placeholder: "Enter the client's last name",
    rules: {
      minLength: {
        value: 2,
        message: 'This field must be at least 2 characters long.'
      },
      maxLength: {
        value: 30,
        message: 'This field must have a maximum of 30 characters'
      },
      required: {
        value: true,
        message: 'This field is required'
      }
    },
    type: 'text'
  },
  {
    name: 'company',
    autoComplete: 'off',
    placeholder: "Enter the client's company",
    rules: {
      minLength: {
        value: 2,
        message: 'This field must be at least 2 characters long.'
      },
      maxLength: {
        value: 50,
        message: 'This field must have a maximum of 50 characters'
      },
      required: {
        value: true,
        message: 'This field is required'
      }
    },
    type: 'text'
  },
  {
    type: 'text',
    autoComplete: 'off',
    name: 'email',
    placeholder: "Enter the client's email",
    rules: {
      required: {
        value: true,
        message: 'This field is required'
      },
      pattern: { value: emailRegex, message: 'This email is invalid' }
    }
  },
  {
    name: 'phone_number',
    autoComplete: 'off',
    placeholder: "Enter the client's phone number",
    rules: {
      minLength: {
        value: 7,
        message: 'This field must be at least 7 characters long.'
      },
      maxLength: {
        value: 15,
        message: 'This field must have a maximum of 7 digits.'
      }
    },
    type: 'tel'
  }
]

export default createClientFields
