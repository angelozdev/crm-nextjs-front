import * as React from 'react'

/* Components */
import { Edit, Trash } from './icons'

/* Types */
import { Product } from 'types'

function ProductRow({ name, quantity, price }: Partial<Product>) {
  return (
    <tr>
      <td className="p-2 border">{name}</td>
      <td className="p-2 border">{quantity}</td>
      <td className="p-2 border">{price}</td>
      <td className="p-2 border">
        <button className="w-full text-red-500 flex items-center justify-center">
          <Trash className="w-6" />
        </button>
      </td>
      <td className="p-2 border">
        <button className="w-full text-green-500 flex items-center justify-center">
          <Edit className="w-6" />
        </button>
      </td>
    </tr>
  )
}

export default ProductRow
