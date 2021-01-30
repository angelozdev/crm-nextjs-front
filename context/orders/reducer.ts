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
      return {
        ...state,
        products: action.products
      }
    }

    default:
      return state
  }
}

export default reducer
