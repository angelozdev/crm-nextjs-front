import * as React from 'react'

/* Components */
import Select, { Styles } from 'react-select'

/* Graphql */
import { gql, useQuery } from '@apollo/client'

/* Next */
import { useRouter } from 'next/router'

/* Constants */
import routes from 'constants/routes'

/* Types */
import { Client, GetMyClients } from 'types'

// Types
type CustomStyles = Partial<Styles<Partial<Client>, false>>

// Styles
const customStyles: CustomStyles = {
  control: function (provided) {
    return {
      ...provided,
      backgroundColor: '#1f1f1f'
    }
  },
  option: function (base) {
    return {
      ...base,
      backgroundColor: '#1f1f1f'
    }
  },
  menu: function (base) {
    return {
      ...base,
      backgroundColor: '#1f1f1f'
    }
  },
  singleValue: function (base) {
    return {
      ...base,
      color: 'white'
    }
  }
}

/* Queries */
const GET_MY_CLIENTS = gql`
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

function SelectClient() {
  const [client, setClient] = React.useState<Partial<Client | []>>([])

  // Queries
  const { data, loading } = useQuery<GetMyClients>(GET_MY_CLIENTS)

  // Methods
  const onChange = (e: Partial<Client>) => {
    setClient(e)
  }

  // Router
  const router = useRouter()

  // Lifecircle
  React.useEffect(() => {
    console.log(client)
  }, [client])

  // Conditionals
  if (loading) return <p>Loading...</p>
  if (!data) {
    router.push(routes.ORDERS)
    return
  }

  const { getMyClients: clients } = data

  return (
    <div>
      <Select
        onChange={onChange}
        name="sabores"
        getOptionLabel={(client) => {
          const name = `${client.first_name} ${client.last_name}`
          return name
        }}
        getOptionValue={(client) => client.id}
        styles={customStyles}
        options={clients}
        placeholder="Select the client"
        noOptionsMessage={() => 'Client not found'}
      />
    </div>
  )
}

export default SelectClient
