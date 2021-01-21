import * as React from 'react'

/* Next */
import { useRouter } from 'next/router'

/* Components */
import { Layout } from 'components'

/* Fixtures */
import { createProduct } from 'fixtures/fileds'

/* React hook form */
import { useForm } from 'react-hook-form'

/* Graphql */
import { gql, useMutation } from '@apollo/client'

/* Constants */
import routes from 'constants/routes'

/* Types */
interface Product {
  name: string
  price: number
  quantity: number
}

/* Queries */
const CREATE_NEW_PRODUCT = gql`
  mutation createNewProduct($name: String!, $price: Float!, $quantity: Int!) {
    createProduct(name: $name, quantity: $quantity, price: $price) {
      name
      quantity
      price
      id
    }
  }
`

function NewProduct() {
  // Routing
  const router = useRouter()

  // React hook form
  const { register, errors, handleSubmit } = useForm<Product>({
    mode: 'onBlur'
  })

  // Mutations
  const [createNewProduct, { loading, error }] = useMutation(CREATE_NEW_PRODUCT)

  // JSX Elements
  const fileds = createProduct.map((field, index) => {
    const { name, autoComplete, placeholder, rules, type, ...rest } = field
    return (
      <div key={`${name}-${index}`} className="mb-4">
        {errors[name] && (
          <span className="text-red-500 text-sm">{errors[name].message}</span>
        )}

        <input
          {...rest}
          type={type}
          className="disabled:opacity-50 outline-none mb-2 btn btn-full bg-transparent"
          placeholder={placeholder}
          name={name}
          ref={register(rules)}
          autoComplete={autoComplete}
          disabled={loading}
        />
      </div>
    )
  })

  // Handlers
  const onSubmit = async (inputs: Product) => {
    console.log(inputs)

    const { name, price, quantity } = inputs

    return createNewProduct({
      variables: {
        name,
        price: Number(price),
        quantity: Number(quantity)
      }
    })
      .then(({ data }) => {
        console.log(data)
        return router.push(routes.PRODUCTS)
      })
      .catch(console.error)
  }

  return (
    <Layout>
      <div className="w-full max-w-md mx-auto lg:p-5 lg:border rounded-lg lg:shadow-lg">
        <h1 className="text-2xl">New Product</h1>
        <div className="my-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {fileds}
            {error && <span className="message error">{error.message}</span>}

            <button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              disabled={loading}
              className="bg-white-100 mt-8 btn btn-full text-black-900 disabled:opacity-50"
            >
              {loading ? 'Creating client...' : 'Create Client'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default NewProduct
