import * as React from 'react'

/* Components */
import Select, { Styles } from 'react-select'
import { Client } from 'types'

/* Types */
type CustomStyles = Partial<Styles<Partial<Client>, false>>

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
  multiValue: function (base) {
    return {
      ...base,
      backgroundColor: 'white'
    }
  }
}

const clients: Partial<Client>[] = [
  { id: '1', first_name: 'Client #1' },
  { id: '2', first_name: 'Client #2' },
  { id: '3', first_name: 'Client #3' }
]

function SelectClient() {
  const [client, setClient] = React.useState<Partial<Client | []>>([])

  // Methods
  const onChange = (e: Partial<Client>) => {
    setClient(e)
  }

  // Lifecircle
  React.useEffect(() => {
    console.log(client)
  }, [client])

  return (
    <div className="to-black-900">
      <Select
        isMulti={true}
        onChange={onChange}
        name="sabores"
        getOptionLabel={(client) => client.first_name}
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
