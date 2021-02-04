import * as React from 'react'

/* NEXT */
import Link from 'next/link'
import { useRouter } from 'next/router'

/* COMPONENTS */
import { Spinner, Layout } from 'components'

/* Constants */
import routes from 'constants/routes'

/* Graphql */
import { gql, useQuery } from '@apollo/client'

/* Types */
import { Client, StatusesOrder, User } from 'types'

// Types
type GetMyOrders = {
  getMyOrders: Array<{
    id: string
    status: StatusesOrder
    client: Client
    seller: User
    products: {
      productId: string
      quantity: number
    }
  }>
}

// Queries
const GET_MY_ORDERS = gql`
  query getMyOrders {
    getMyOrders {
      id
      status
      client {
        first_name
        last_name
      }
      seller {
        first_name
        last_name
      }
      products {
        productId
        quantity
      }
    }
  }
`

function Orders(): JSX.Element {
  // Queries
  const { data, loading } = useQuery<GetMyOrders>(GET_MY_ORDERS)

  // Routing
  const router = useRouter()

  // Lifecircle
  React.useEffect(() => {
    console.log(data)
  }, [data])

  // Conditionals
  if (loading) return <Spinner />
  if (!data) {
    router.push(routes.HOME)
    return
  }

  const { getMyOrders } = data

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl mb-5">Orders</h1>
        <Link href={routes.NEW_ORDER}>
          <a className="btn primary inline-block mb-5">
            <span className="mx-4">New Order</span>
          </a>
        </Link>
        {getMyOrders.map((order) => {
          return (
            <p>
              {order.client.first_name} {order.client.last_name}
            </p>
          )
        })}
      </div>
    </Layout>
  )
}

export default Orders
