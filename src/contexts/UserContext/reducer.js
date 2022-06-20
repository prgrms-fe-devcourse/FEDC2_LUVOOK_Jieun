import { SET_USER, RESET_USER, SET_LOADING, SET_LOADING_DONE } from './constants'
import { initialUserData } from './initialUserState'

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        currentUser: payload.user,
        isLoading: false,
        token: payload.token,
      }
    case RESET_USER:
      return initialUserData
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case SET_LOADING_DONE:
      return {
        ...state,
        isLoading: false,
      }
    default:
      throw new Error(`Unknown action type: ${type}`)
  }
}
