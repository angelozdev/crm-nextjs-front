import { LocalState, initialState } from './state'
import { ActionTypes } from './actions'

function reducer(state: LocalState = initialState, action: any) {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer
