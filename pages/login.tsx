import Layout from '@components/Layout'
import routes from 'constants/routes'
import Link from 'next/link'

function Login() {
  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Let's go! Log in.</h1>
      <h3 className="text-xl">
        Welcome back. <br /> You've been missed!
      </h3>
      <div className="my-8">
        <form>
          <input
            type="email"
            className="bg-transparent btn"
            placeholder="Enter your email"
          />

          <input
            type="password"
            className="bg-transparent btn"
            placeholder="Enter your password"
          />
          <p className="mt-24 mb-4 text-center text-gray-400">
            Don't have an account?{' '}
            <Link href={routes.SIGNUP}>
              <a className="text-white-100">Register</a>
            </Link>
          </p>
          <button className="bg-white-100 btn text-black-900">Login</button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
