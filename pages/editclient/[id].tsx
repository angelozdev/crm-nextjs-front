import * as React from 'react'

/* Components */
import { Layout } from '@components'

/* Next */
import { useRouter } from 'next/router'

/* React hook form */
import { useForm } from 'react-hook-form'

/* Fixtures */
import createClientFields from 'fixtures/createClientFields'

/* Graphql */
import { gql, useMutation, useQuery } from '@apollo/client'
/* Constants */
import routes from 'constants/routes'

/* Types */
import { Client } from 'types'

type GetClientById = { getClientById: Client }
type UpdateClientById = { updateClientById: Client }

const GET_CLIENT_BY_ID = gql`
  query getClientById($id: String!) {
    getClientById(id: $id) {
      first_name
      last_name
      email
      company
      phone_number
    }
  }
`

const UPDATE_CLIENT_BY_ID = gql`
  mutation updateClientById($id: String!, $input: UpdateClientFields!) {
    updateClientById(id: $id, input: $input) {
      id
      last_name
      company
      first_name
    }
  }
`

function EditClient() {
  // Routing
  const router = useRouter()
  const { id } = router.query

  // Mutations
  const [
    updateClient,
    { loading: editingClient }
  ] = useMutation<UpdateClientById>(UPDATE_CLIENT_BY_ID)

  // Queries
  const { data, error, loading: getDataLoading } = useQuery<GetClientById>(
    GET_CLIENT_BY_ID,
    {
      variables: { id }
    }
  )

  // Methods
  const onSubmit = async (inputs: Client): Promise<void> => {
    const { first_name, last_name, phone_number, company, email } = inputs

    return updateClient({
      variables: {
        id,
        input: {
          first_name,
          last_name,
          phone_number,
          company,
          email
        }
      }
    })
      .then(() => {
        console.log('Updated')
        router.push(routes.HOME)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // react hook form
  const { handleSubmit, register, errors } = useForm<Client>({
    mode: 'onBlur'
  })

  // Lifecircle
  React.useEffect(() => {
    console.log(data)
  }, [data])

  // Condifionals
  // TODO: Spinner
  if (getDataLoading) return null

  if (!data && !data.getClientById) {
    router.push(routes.NEW_CLIENT)
    return null
  }

  // JSX
  const fileds = createClientFields.map((field, index) => {
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
          disabled={editingClient}
          defaultValue={data.getClientById[name] || ''}
        />
      </div>
    )
  })

  return (
    <Layout>
      <div className="w-full max-w-md mx-auto lg:p-5 lg:border rounded-lg lg:shadow-lg">
        <h1 className="text-2xl">Edit Client</h1>

        <div className="my-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {fileds}
            {error && <span className="message error">{error.message}</span>}

            <button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              disabled={editingClient}
              className="bg-white-100 mt-8 btn btn-full text-black-900 disabled:opacity-50"
            >
              {editingClient ? 'Creating client...' : 'Edit Client'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default EditClient
