/* Components */
import * as React from 'react'

/* Components */
import { ClientRows, Layout, Spinner } from '@components'

/* Next */
import { useRouter } from 'next/router'
import Link from 'next/link'

/* Apollo */
import { gql, useQuery } from '@apollo/client'

/* Contants */
import routes from 'constants/routes'

/* Types */
import { GetMyClients } from 'types'

/* Queries */
const GET_MY_CLIENTS = gql`
  query getMyClients {
    getMyClients {
      id
      first_name
      last_name
      company
      email
    }
  }
`

function Home(): JSX.Element {
  // Queries
  const { data, loading } = useQuery<GetMyClients>(GET_MY_CLIENTS)

  // Routing
  const router = useRouter()

  // TODO: Spinner
  if (loading) return <Spinner />

  // Redirect
  if (!data) {
    router.push(routes.LOGIN)
    return null
  }

  //
  const { getMyClients: clients } = data
  const areThereClients = clients.length > 0

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl mb-5">Clients</h1>
        <Link href={routes.NEW_CLIENT}>
          <a className="btn inline-block mb-5">New Client</a>
        </Link>
        {areThereClients ? (
          <table className="table-auto w-full border">
            <thead>
              <tr className="dark:bg-black-900 bg-gray-100">
                <th className="p-2 border">Fullname</th>
                <th className="p-2 border">Company</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Delete</th>
                <th className="p-2 border">Edit</th>
              </tr>
            </thead>
            <tbody>
              <ClientRows clients={clients} />
            </tbody>
          </table>
        ) : (
          <p>You don't have clients for now.</p>
        )}
      </div>
    </Layout>
  )
}

export default Home
