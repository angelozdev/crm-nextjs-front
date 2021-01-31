import * as React from 'react'

/* Components */
import { Layout } from 'components'
import {
  AddProduct,
  SelectClient,
  SelectedProductList
} from 'components/orders'

/* Main Component */
function NewOrder() {
  return (
    <Layout>
      <div className="w-full max-w-md mx-auto lg:p-5 lg:border rounded-lg lg:shadow-lg">
        <h1 className="text-2xl">New Order</h1>
        <div className="my-8">
          <form>
            <SelectClient />
            <AddProduct />
            <SelectedProductList />
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default NewOrder
