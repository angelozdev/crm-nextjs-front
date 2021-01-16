/* React */
import * as React from 'react'

/* Graphql */
import { useQuery, gql } from '@apollo/client'

/* Next */
import { useRouter } from 'next/router'

/* Constants */
import routes from 'constants/routes'

/* Types */
import { User } from 'types'

type GetUserLogged = { getUserLogged: User }

const GET_USER_LOGGED = gql`
  query getUserLogged {
    getUserLogged {
      first_name
      last_name
    }
  }
`

function Header(): JSX.Element {
  // grapql queries
  const { data, loading } = useQuery<GetUserLogged>(GET_USER_LOGGED)

  // rouring
  const router = useRouter()

  // Methods
  const handleClick = () => {
    localStorage.removeItem('TOKEN')
    router.push(routes.LOGIN)
  }

  // TODO: Spinner
  if (loading) {
    return null
  }

  // Redirect
  if (!data) {
    router.push(routes.LOGIN)
    return null
  }

  const {
    getUserLogged: { first_name, last_name }
  } = data

  return (
    <header className="border-b p-5">
      <div className="flex justify-between items-center">
        <h1>
          Welcome, {first_name} {last_name}!
        </h1>
        <button onClick={handleClick} className="btn inline-block">
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header
