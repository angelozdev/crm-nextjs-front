import * as React from 'react'

/* Types */
import { Client } from 'types'
import { Trash } from './icons'

function ClientRow({
  first_name,
  last_name,
  company,
  email,
  id
}: Partial<Client>): JSX.Element {
  // Methods
  const handleDelete = (id) => {
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
          onClick={() => handleDelete(id)}
          className="w-full text-red-500 flex items-center justify-center"
        >
          <Trash className="w-6" />
        </button>
      </td>
    </tr>
  )
}

export default ClientRow
