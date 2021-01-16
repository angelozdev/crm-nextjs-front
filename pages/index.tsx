/* Components */
import * as React from 'react'
import Layout from '@components/Layout'

/* Next */
import { useRouter } from 'next/router'

/* Apollo */
import { gql, useQuery } from '@apollo/client'

/* Contants */
import routes from 'constants/routes'

/* Types */
import { Client } from 'types'

type GetMyClients = { getMyClients: Client[] }

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
  if (loading) {
    return null
  }

  // Redirect
  if (!data) {
    router.push(routes.LOGIN)
    return null
  }

  const { getMyClients } = data
  const rows = getMyClients.map((client) => {
    const { id, first_name, last_name, company, email } = client
    return (
      <tr key={id}>
        <td className="p-2 border">
          {first_name} {last_name}
        </td>
        <td className="p-2 border">{company}</td>
        <td className="p-2 border">{email}</td>
      </tr>
    )
  })

  return (
    <Layout>
      <h1 className="text-2xl mb-5">Clients</h1>
      <table className="table-auto w-full border max-w-2xl">
        <thead>
          <tr className="dark:bg-black-900 bg-gray-100">
            <th className="p-2 border">Fullname</th>
            <th className="p-2 border">Company</th>
            <th className="p-2 border">Email</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </Layout>
  )
}

export default Home
