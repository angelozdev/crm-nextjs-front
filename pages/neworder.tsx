import * as React from 'react'

/* Components */
import { ErrorMessage, Layout } from 'components'
import {
  AddProduct,
  SelectClient,
  SelectedProductList,
  Total
} from 'components/orders'

/* Context */
import OrderContext from 'context/orders/context'
import { resetOrderForm } from 'context/orders/actions'

/* Graphql */
import { gql, useMutation } from '@apollo/client'

/* NExt */
import { useRouter } from 'next/router'

/* Contanst */
import routes from 'constants/routes'

// Queries
const CREATE_NEW_ORDER = gql`
  mutation createOrder($input: CreateOrderFields!) {
    createOrder(input: $input) {
      id
    }
  }
`

/* Main Component */
function NewOrder() {
  const { state, dispatch } = React.useContext(OrderContext)

  // Queries
  const [createOrder, { error }] = useMutation(CREATE_NEW_ORDER)

  // States
  const [isValid, setIsValid] = React.useState(false)

  // Methods
  const validate = (): boolean => {
    const { products, total, client } = state
    const haveProducts = products.every((p) => p.quantity !== 0)
    if (!haveProducts) return false

    const hasClient = !!client
    if (!hasClient) return false

    const isTotalGreaterThanZero = total > 0
    if (!isTotalGreaterThanZero) return false

    return true
  }

  // Routing
  const router = useRouter()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const products = state.products.reduce((accum, current) => {
      return [...accum, { productId: current.id, quantity: current.quantity }]
    }, [])

    createOrder({
      variables: {
        input: {
          products,
          total: state.total,
          client: state.client.id
        }
      }
    })
      .then(() => {
        dispatch(resetOrderForm())
        return router.push(routes.ORDERS)
      })
      .catch(console.error)
  }

  React.useEffect(() => {
    setIsValid(validate())
  }, [state])

  return (
    <Layout>
      <div className="w-full max-w-md mx-auto lg:p-5 lg:border rounded-lg lg:shadow-lg">
        <h1 className="text-2xl">New Order</h1>
        <div className="my-8">
          <form onSubmit={onSubmit}>
            <SelectClient />
            <AddProduct />
            <SelectedProductList />
            <Total />
            <ErrorMessage className="mt-4" error={error} />

            <button className="btn primary btn-full mt-4" disabled={!isValid}>
              <span className="mx-4">Save</span>
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default NewOrder
