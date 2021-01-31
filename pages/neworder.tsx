import * as React from 'react'

/* Components */
import { Layout } from 'components'
import {
  AddProduct,
  SelectClient,
  SelectedProductList,
  Total
} from 'components/orders'
import OrderContext from 'context/orders/context'

/* Main Component */
function NewOrder() {
  const { state } = React.useContext(OrderContext)

  const [isValid, setIsValid] = React.useState(false)

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

  React.useEffect(() => {
    setIsValid(validate())
  }, [state])

  return (
    <Layout>
      <div className="w-full max-w-md mx-auto lg:p-5 lg:border rounded-lg lg:shadow-lg">
        <h1 className="text-2xl">New Order</h1>
        <div className="my-8">
          <form>
            <SelectClient />
            <AddProduct />
            <SelectedProductList />
            <Total />

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
