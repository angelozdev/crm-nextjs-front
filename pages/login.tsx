/* Components */
import { Layout } from '@components/index'
import * as React from 'react'
import { useForm } from 'react-hook-form'

/* Constants */
import routes from 'constants/routes'

/* Next */
import Link from 'next/link'
import loginFields from 'fixtures/loginFields'

/* Types */
interface Inputs {
  email: string
  password: string
}

function Login() {
  const {
    register,
    handleSubmit,
    errors,
    clearErrors,
    formState: { isSubmitting }
  } = useForm<Inputs>({ mode: 'onBlur' })

  /* Methods */
  const onSubmit = async (e: Inputs): Promise<Inputs> => {
    clearErrors()

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(e)
      }, 1000)
    })
  }

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Let's go! Log in.</h1>
      <h3 className="text-xl">
        Welcome back. <br /> You've been missed!
      </h3>
      <div className="my-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          {loginFields.map((field, index) => {
            const { name, type, autoComplete, placeholder, rules } = field
            return (
              <div key={`${name}-${index}`}>
                {errors[name] && (
                  <span className="text-red-500 text-sm">
                    {errors[name].message}
                  </span>
                )}
                <input
                  disabled={isSubmitting}
                  type={type}
                  className={`disabled:opacity-50 outline-none btn bg-transparent ${
                    errors[name] ? 'border-red-500' : ''
                  }`}
                  placeholder={placeholder}
                  name={name}
                  ref={register(rules)}
                  autoComplete={autoComplete}
                />
              </div>
            )
          })}

          <p className="mt-24 mb-4 text-center text-gray-400">
            Don't have an account?{' '}
            <Link href={routes.SIGNUP}>
              <a className="text-white-100">Register</a>
            </Link>
          </p>
          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-white-100 btn text-black-900 disabled:opacity-50"
          >
            {isSubmitting ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
