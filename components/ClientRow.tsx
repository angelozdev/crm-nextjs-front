import * as React from 'react'

/* SweetAlert */
import Swal, { SweetAlertOptions } from 'sweetalert2'

/* Graphql */
import { gql, MutationUpdaterFn, useMutation } from '@apollo/client'

/* Components */
import { Edit, Trash } from './icons'

/* Next */
import { useRouter } from 'next/router'

/* Constants */
import routes from 'constants/routes'

/* Types */
import { Client, GetMyClients } from 'types'

type DeleteClientById = { deleteClientById: Client }

const DELETE_CLIENT_BY_ID = gql`
  mutation deleteClientById($id: String!) {
    deleteClientById(id: $id) {
      id
      first_name
      email
    }
  }
`

function ClientRow({
  first_name,
  last_name,
  company,
  email,
  id
}: Partial<Client>): JSX.Element {
  // Clean cache
  const updateCacheOnDelete: MutationUpdaterFn<DeleteClientById> = (cache) => {
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
    const { getMyClients: clients } = cache.readQuery<GetMyClients>({ query })

    cache.writeQuery<GetMyClients>({
      query,
      data: {
        getMyClients: clients.filter((client) => {
          return client.id !== id
        })
      }
    })
  }

  // Routing
  const router = useRouter()

  // Mutations
  const [deleteClientById] = useMutation<DeleteClientById>(
    DELETE_CLIENT_BY_ID,
    { update: updateCacheOnDelete }
  )

  // Methods
  const handleDelete = async (): Promise<void> => {
    const options: SweetAlertOptions = {
      title: 'Are you sure?',
      icon: 'warning',
      text: `You will delete this client: ${first_name} ${last_name}`,
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

        deleteClientById({ variables: { id } }).then(() => {
          const options: SweetAlertOptions = {
            title: 'Deleted!',
            text: `Your client has been deleted.`,
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
      pathname: routes.EDIT_CLIENT,
      query: { id }
    })
  }

  return (
    <tr>
      <td className="border p-4 dark:border-dark-5">
        {first_name} {last_name}
      </td>
      <td className="border p-4 dark:border-dark-5">{company}</td>
      <td className="border p-4 dark:border-dark-5">{email}</td>
      <td className="border p-4 dark:border-dark-5">
        <button
          onClick={handleDelete}
          className="w-full text-red-500 flex items-center justify-center"
        >
          <Trash className="w-6" />
        </button>
      </td>
      <td className="border p-4 dark:border-dark-5">
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

export default ClientRow
