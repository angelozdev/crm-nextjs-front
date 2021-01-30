import { Client, Product } from 'types'

/* ACTIONS TYPES */
export enum ActionTypes {
  SELECT_CLIENT = 'SELECT_CLIENT',
  PRODUCT_QUANTITY = 'PRODUCT_QUANTITY',
  ADD_PRODUCT = 'ADD_PRODUCT'
}

export interface SelectClient {
  type: typeof ActionTypes.SELECT_CLIENT
  client: Client
}
export interface AddProduct {
  type: typeof ActionTypes.ADD_PRODUCT
  products: Product[]
}

export type Actions = SelectClient | AddProduct

export type Value = {
  state: LocalState
  dispatch: React.Dispatch<Actions>
}

/* LOCAL STATE */
export interface LocalState {
  client: Client
  products: Product[]
  total: number
}
