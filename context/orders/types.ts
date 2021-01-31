import { Client, Product, ProductWithQuantity } from 'types'

/* ACTIONS TYPES */
export enum ActionTypes {
  SELECT_CLIENT = 'SELECT_CLIENT',
  SET_QUANTITY = 'SET_QUANTITY',
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

export interface SetQuantity {
  type: typeof ActionTypes.SET_QUANTITY
  productWithQuantity: ProductWithQuantity
}

export type Actions = SelectClient | AddProduct | SetQuantity

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
