import * as React from 'react'

/* Components */
import { ProductRow } from './'

/* Types */
import { Product } from 'types'

/* Types */
interface Props {
  products: Product[]
}

function ProductRows({ products }: Props) {
  return (
    <React.Fragment>
      {products.map((product, index) => {
        const { name, price, quantity } = product
        return (
          <ProductRow
            key={index}
            price={price}
            name={name}
            quantity={quantity}
          />
        )
      })}
    </React.Fragment>
  )
}

export default ProductRows
