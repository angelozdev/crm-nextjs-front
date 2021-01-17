import * as React from 'react'

/* SweetAlert */
import Swal, { SweetAlertOptions } from 'sweetalert2'

/* Graphql */
import { gql, MutationUpdaterFn, useMutation } from '@apollo/client'

/* Types */
import { Client, GetMyClients } from 'types'
import { Edit, Trash } from './icons'

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
  const updateCache: MutationUpdaterFn<DeleteClientById> = (cache) => {
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

    cache.writeQuery({
      query,
      data: {
        getMyClients: clients.filter((client) => {
          return client.id !== id
        })
      }
    })
  }

  const [deleteClientById] = useMutation<DeleteClientById>(
    DELETE_CLIENT_BY_ID,
    { update: updateCache }
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
    console.log(id)
  }

  return (
    <tr>
      <td className="p-2 border">
        {first_name} {last_name}
      </td>
      <td className="p-2 border">{company}</td>
      <td className="p-2 border">{email}</td>
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

export default ClientRow
