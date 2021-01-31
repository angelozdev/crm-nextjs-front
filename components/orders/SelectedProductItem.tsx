import * as React from 'react'

/* Types */
import { Product } from 'types'
import { formatedPrice } from 'utils'

// Types
interface Props {
  product: Product
}

/* Main Component */
function SelectedProductItem({ product }: Props) {
  const { name, price, stock } = product
  return (
    <div className="mb-2 flex justify-between items-center">
      <div className="w-3/5">
        <p>{name}</p>
        <p>{formatedPrice(price)}</p>
      </div>

      <div className="w-1/5 ml-2">
        <input
          className="outline-none mb-2 btn btn-full bg-transparent"
          type="number"
          min="1"
          max={stock}
          defaultValue="1"
          placeholder="Quantity"
        />
      </div>
    </div>
  )
}

export default SelectedProductItem
