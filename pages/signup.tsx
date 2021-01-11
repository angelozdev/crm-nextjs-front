import Layout from '@components/Layout'
import routes from 'constants/routes'
import signupFields from 'fixtures/signupFields'
import Link from 'next/link'

function Login() {
  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Let's sign you in.</h1>
      <h3 className="text-xl">Welcome to our house!</h3>
      <div className="my-8">
        <form>
          {signupFields.map((field, index) => (
            <input
              key={index}
              type={field.type}
              className="bg-transparent btn"
              placeholder={field.placeholder}
              name={field.name}
            />
          ))}

          <p className="mt-8 mb-4 text-center text-gray-400">
            I already have an{' '}
            <Link href={routes.LOGIN}>
              <a className="text-white-100">account</a>
            </Link>
            !
          </p>
          <button className="bg-white-100 btn text-black-900">Sign in</button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
