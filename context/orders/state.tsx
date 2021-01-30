import * as React from 'react'
import { Client, Product } from 'types'
import OrderContext from './context'
import OrderReducer from './reducer'

/* Types */
interface Props {
  children: React.ReactChild
}

export interface LocalState {
  client: Client
  products: Product[]
  total: number
}

export const initialState: LocalState = {
  client: null,
  products: [],
  total: 0
}

/* Main Component */
function OrderState({ children }: Props) {
  // Reducer
  const [state, dispatch] = React.useReducer(OrderReducer, initialState)

  return <OrderContext.Provider value={state}>{children}</OrderContext.Provider>
}

export default OrderState
