import { Client, Product, ProductWithQuantity } from 'types'
import { ActionTypes, AddProduct, SelectClient, SetQuantity } from './types'

/* ACTIONS */
export const selectClient = (client: Client): SelectClient => ({
  type: ActionTypes.SELECT_CLIENT,
  client
})

export const addProduct = (products: Product[]): AddProduct => ({
  type: ActionTypes.ADD_PRODUCT,
  products
})

export const setQuantity = (
  productWithQuantity: ProductWithQuantity
): SetQuantity => ({
  type: ActionTypes.SET_QUANTITY,
  productWithQuantity
})
