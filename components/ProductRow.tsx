import * as React from 'react'

/* Components */
import { Edit, Trash } from './icons'

/* Swal */
import Swal, { SweetAlertOptions } from 'sweetalert2'

/* Graphql */
import { gql, MutationUpdaterFn, useMutation } from '@apollo/client'

/* Types */
import { GetProducts, Product } from 'types'

/* Next */
import { useRouter } from 'next/router'

/* Contants */
import routes from 'constants/routes'

/* Queries and types */
type DeleteClientById = { deleteProductById: Product }
const DELETE_PRODUCT_BY_ID = gql`
  mutation deleteProductById($id: String!) {
    deleteProductById(id: $id) {
      id
      name
      quantity
      price
    }
  }
`

function ProductRow({ name, quantity, price, id }: Partial<Product>) {
  // States
  const formatedPrice = new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD',
    currencySign: 'accounting'
  })
    .format(price)
    .replace('.00', '')
  const router = useRouter()

  // clean cache on delete product
  const updateCacheOnDelete: MutationUpdaterFn<DeleteClientById> = (cache) => {
    const query = gql`
      query getAllProducts {
        getProducts {
          id
          name
          quantity
          price
        }
      }
    `
    const { getProducts: products } = cache.readQuery<GetProducts>({ query })

    cache.writeQuery({
      query,
      data: {
        getProducts: products.filter((client) => {
          return client.id !== id
        })
      }
    })
  }

  // Mutations
  const [deleteProductById] = useMutation(DELETE_PRODUCT_BY_ID, {
    update: updateCacheOnDelete
  })

  // Handle methods
  const handleDelete = () => {
    const options: SweetAlertOptions = {
      title: 'Are you sure?',
      icon: 'warning',
      text: `You will delete: ${name}`,
      showCancelButton: true,
      cancelButtonColor: 'rgb(239, 68, 68)',
      confirmButtonColor: 'rgb(16, 185, 129)',
      iconColor: 'rgb(239, 68, 68)',
      background: 'rgb(242, 242, 242)',
      confirmButtonText: 'Delete'
    }

    Swal.fire(options)
      .then(({ isConfirmed }) => {
        if (!isConfirmed) return

        deleteProductById({ variables: { id } }).then(() => {
          const options: SweetAlertOptions = {
            title: 'Deleted!',
            text: `This product has been deleted.`,
            icon: 'success',
            iconColor: 'rgb(16, 185, 129)'
          }
          Swal.fire(options)
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleEdit = () => {
    router.push({
      pathname: routes.EDIT_PRODUCT,
      query: { id }
    })
  }

  return (
    <tr>
      <td className="p-2 border">{name}</td>
      <td className="p-2 border text-center">{quantity}</td>
      <td className="p-2 border text-center">{formatedPrice}</td>
      <td className="p-2 border">
        <button
          onClick={handleDelete}
          className="w-full text-red-500 flex items-center justify-center"
        >
          <Trash className="w-6" />
        </button>
      </td>
      <td className="p-2 border">
        <button
          onClick={handleEdit}
          className="w-full text-green-500 flex items-center justify-center"
        >
          <Edit className="w-6" />
        </button>
      </td>
    </tr>
  )
}

export default ProductRow
