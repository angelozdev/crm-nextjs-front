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
      {products.map((product) => {
        const { name, price, quantity, id } = product
        return (
          <ProductRow
            id={id}
            key={id}
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
