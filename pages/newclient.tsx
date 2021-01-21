import * as React from 'react'

/* Components */
import { Layout, Spinner } from '@components'

/* Next */
import { useRouter } from 'next/router'

/* React hook form */
import { useForm } from 'react-hook-form'

/* Graphql */
import { gql, MutationUpdaterFn, useMutation } from '@apollo/client'

/* Fixtures */
import { createClientFields } from 'fixtures/fileds'

/* Constants */
import routes from 'constants/routes'

/* Types */
import { Client, GetMyClients } from 'types'

type CreateNewClient = {
  createClient: Client
}

const CREAT_NEW_CLIENT = gql`
  mutation createNewClient($input: CreateClientFields!) {
    createClient(input: $input) {
      id
      first_name
      company
      email
    }
  }
`

function NewClient() {
  // Routing
  const router = useRouter()

  // React-hook-form
  const { register, handleSubmit, errors, clearErrors } = useForm<Client>({
    mode: 'onBlur'
  })

  // Update cache after create new user
  const updateCache: MutationUpdaterFn<CreateNewClient> = (
    cache,
    { data: { createClient } }
  ) => {
    const query = gql`
      query getMyClients {
        getMyClients {
          id
          first_name
          last_name
          company
          email
        }
      }
    `
    const { getMyClients } = cache.readQuery<GetMyClients>({ query })

    cache.writeQuery({
      query,
      data: {
        getMyClients: [...getMyClients, createClient]
      }
    })
  }

  // Mutations
  const [createNewClient, { loading, error }] = useMutation<CreateNewClient>(
    CREAT_NEW_CLIENT,
    { update: updateCache }
  )

  //Methods
  const onSubmit = async (inputs: Client): Promise<void> => {
    clearErrors()

    const { first_name, last_name, company, email, phone_number } = inputs

    return createNewClient({
      variables: {
        input: {
          first_name,
          last_name,
          company,
          email,
          phone_number: phone_number.toString() || null
        }
      }
    })
      .then((newClient) => {
        console.log(newClient)
        router.push(routes.HOME)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // Conditionals
  if (loading) return <Spinner />

  // JSX Elements
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
          disabled={loading}
        />
      </div>
    )
  })

  return (
    <Layout>
      <div className="w-full max-w-md mx-auto lg:p-5 lg:border rounded-lg lg:shadow-lg">
        <h1 className="text-2xl">New Client</h1>
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

export default NewClient
