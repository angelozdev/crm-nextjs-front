import * as React from 'react'
import Layout from '@components/Layout'

/* Apollo */
import { gql, useQuery } from '@apollo/client'

/* Queries */
const GET_ALL_USERS = gql`
  query getAllUsers {
    getUsers {
      first_name
      email
      id
      createdAt
      updatedAt
      password
    }
  }
`

function Home() {
  const { data } = useQuery(GET_ALL_USERS)

  React.useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <Layout>
      <h1 className="text-2xl">Clients</h1>
    </Layout>
  )
}

export default Home
