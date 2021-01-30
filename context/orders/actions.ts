import { Client, Product } from 'types'
import { ActionTypes, AddProduct, SelectClient } from './types'

/* ACTIONS */
export const selectClient = (client: Client): SelectClient => ({
  type: ActionTypes.SELECT_CLIENT,
  client
})

export const addProduct = (products: Product[]): AddProduct => ({
  type: ActionTypes.ADD_PRODUCT,
  products
})
