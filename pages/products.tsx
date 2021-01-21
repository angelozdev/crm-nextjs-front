/* Components */
import { Layout, ProductRows, Spinner } from '@components'

/* Graphql */
import { gql, useQuery } from '@apollo/client'

/* Next */
import { useRouter } from 'next/router'
import Link from 'next/link'

/* Contants */
import routes from 'constants/routes'

/* Types */
import { GetProducts, Product } from 'types'

/* Types and Queries */

const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    getProducts {
      id
      name
      quantity
      price
      createdAt
    }
  }
`

function Orders() {
  // Queries
  const { data, loading } = useQuery<GetProducts>(GET_ALL_PRODUCTS)

  // Routing
  const router = useRouter()

  // Conditionals
  if (loading) return <Spinner />

  if (!data) {
    router.push(routes.LOGIN)
  }
  const { getProducts: products } = data
  const areThereProucts = products.length > 0

  console.log(data)

  return (
    <Layout>
      <h1 className="text-2xl mb-5">Products</h1>
      <Link href={routes.NEW_PRODUCT}>
        <a className="btn inline-block mb-5">New Product</a>
      </Link>
      {areThereProucts ? (
        <table className="table-auto w-full border">
          <thead>
            <tr className="dark:bg-black-900 bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Delete</th>
              <th className="p-2 border">Edit</th>
            </tr>
          </thead>
          <tbody>
            <ProductRows products={products} />
          </tbody>
        </table>
      ) : (
        <p>You don't have clients for now.</p>
      )}
    </Layout>
  )
}

export default Orders
