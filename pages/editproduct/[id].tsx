import * as React from 'react'

/* Next */
import { useRouter } from 'next/router'

/* Components */
import { Layout, Spinner } from 'components'

/* Fixtures */
import { createProduct } from 'fixtures/fileds'

/* Graphql */
import { useQuery, gql, useMutation } from '@apollo/client'

/* Constants */
import routes from 'constants/routes'

/* Types */
import { Product } from 'types'

/* Form */
import { useForm } from 'react-hook-form'

/* Swal */
import Swal, { SweetAlertOptions } from 'sweetalert2'

/* Types */
type GetProductById = { getProductById: Product }
interface Fields {
  name: string
  quantity: number
  price: number
}

/* Queries */
const GET_PRODUCT_BY_ID = gql`
  query getProductById($id: String!) {
    getProductById(id: $id) {
      id
      name
      quantity
      price
    }
  }
`

const UPDATE_PRODUCT = gql`
  mutation updateProductById($input: UpdateProductFields!, $id: String!) {
    updateProductById(input: $input, id: $id) {
      id
      name
      price
      quantity
    }
  }
`

function EditProduct() {
  // Form
  const { register, errors, handleSubmit } = useForm<Fields>({ mode: 'onBlur' })

  // Routing
  const router = useRouter()
  const { id } = router.query

  // Queries
  const { data, loading: gettingData } = useQuery<GetProductById>(
    GET_PRODUCT_BY_ID,
    {
      variables: { id }
    }
  )

  // Mutations
  const [updateProduct, { error, loading: updating }] = useMutation(
    UPDATE_PRODUCT
  )

  if (gettingData) return <Spinner />

  if (!data) {
    router.push(routes.PRODUCTS)
    return
  }

  // JSX Elements
  const fields = createProduct.map((field, index) => {
    const { name, autoComplete, placeholder, rules, type } = field
    return (
      <div key={`${name}-${index}`} className="mb-4">
        {errors[name] && (
          <span className="text-red-500 text-sm">{errors[name].message}</span>
        )}

        <input
          type={type}
          className="disabled:opacity-50 outline-none mb-2 btn btn-full bg-transparent"
          placeholder={placeholder}
          name={name}
          ref={register(rules)}
          autoComplete={autoComplete}
          disabled={updating}
          defaultValue={data.getProductById[name] || ''}
        />
      </div>
    )
  })

  // Handlers
  const onSubmit = async (inputs: Fields): Promise<void> => {
    const { name, quantity, price } = inputs
    return updateProduct({
      variables: {
        id,
        input: {
          name,
          quantity: Number(quantity),
          price: Number(price)
        }
      }
    })
      .then(({ data }) => {
        console.log(data)
        return router.push(routes.PRODUCTS)
      })
      .then(() => {
        const options: SweetAlertOptions = {
          title: 'Updated!',
          icon: 'success',
          text: `Your product was updated successfully.`,
          confirmButtonColor: 'rgb(16, 185, 129)',
          iconColor: 'rgb(16, 185, 129)',
          background: 'rgb(242, 242, 242)',
          confirmButtonText: 'Okay'
        }
        Swal.fire(options)
      })
      .catch(console.error)
  }

  return (
    <Layout>
      <div className="w-full max-w-md mx-auto lg:p-5 lg:border rounded-lg lg:shadow-lg">
        <h1 className="text-2xl">Edit Client</h1>

        <div className="my-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {fields}
            {error && <span className="message error">{error.message}</span>}

            <button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              disabled={updating}
              className="mt-8 btn primary btn-full disabled:opacity-50"
            >
              {updating ? 'Creating client...' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default EditProduct