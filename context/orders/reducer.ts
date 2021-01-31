import { Product, ProductWithQuantity } from 'types'
import { initialState } from './state'
import { Actions, ActionTypes, LocalState } from './types'

function reducer(
  state: LocalState = initialState,
  action: Actions
): LocalState {
  switch (action.type) {
    case ActionTypes.SELECT_CLIENT: {
      return {
        ...state,
        client: action.client
      }
    }

    case ActionTypes.ADD_PRODUCT: {
      let products: Product[] | ProductWithQuantity[] = []

      if (state.products.length > 0) {
        products = action.products.map((productSelected) => {
          const productState = state.products.find((p) => {
            return p.id === productSelected.id
          })

          if (productState) return productState

          return productSelected
        })
      } else {
        products = action.products
      }

      return {
        ...state,
        products
      }
    }

    case ActionTypes.SET_QUANTITY: {
      const products = state.products.map((product) => {
        if (product.id === action.productWithQuantity.id) {
          product = action.productWithQuantity
        }

        return product
      })

      return {
        ...state,
        products
      }
    }
    default:
      return state
  }
}

export default reducer
