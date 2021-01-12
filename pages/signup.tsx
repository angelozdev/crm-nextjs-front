/* Components */
import Layout from '@components/Layout'

/* Constants */
import routes from 'constants/routes'

/* Fixtures */
import signupFields from 'fixtures/signupFields'

/* Next */
import Link from 'next/link'

/* Hooks */
import { useForm } from 'react-hook-form'
import * as React from 'react'

/* Types */
interface Inputs {
  email: string
  password: string
  confirm_password: string
  first_name: string
  last_name: string
}

function Login() {
  const {
    register,
    handleSubmit,
    clearErrors,
    errors,
    setError,
    formState: { isSubmitting, touched }
  } = useForm<Inputs>({ mode: 'onBlur' })

  /* Methods */
  const onSubmit = async (e: Inputs): Promise<Inputs> => {
    clearErrors()

    if (e.confirm_password !== e.password) {
      setError('confirm_password', {
        message: 'The passwords are not the same.',
        shouldFocus: true
      })

      return null
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(e)
      }, 1000)
    })
  }

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Let's sign you in.</h1>
      <h3 className="text-xl">Welcome to our house!</h3>
      <div className="my-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          {signupFields.map((field, index) => {
            const { name, autoComplete, rules, type, placeholder } = field
            return (
              <div key={`${name}-${index}`}>
                {errors[name] && (
                  <span className="text-red-500 text-sm">
                    {errors[name].message}
                  </span>
                )}
                <input
                  type={type}
                  disabled={isSubmitting}
                  className={`disabled:opacity-50 outline-none btn bg-transparent ${
                    errors[name] ? 'border-red-500' : ''
                  }`}
                  placeholder={placeholder}
                  name={name}
                  autoComplete={autoComplete}
                  ref={register(rules)}
                />
              </div>
            )
          })}

          <p className="mt-8 mb-4 text-center text-gray-400">
            I already have an{' '}
            <Link href={routes.LOGIN}>
              <a className="text-white-100">account</a>
            </Link>
            !
          </p>
          <button
            disabled={isSubmitting}
            className="bg-white-100 btn text-black-900 disabled:opacity-50"
          >
            Sign in
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
