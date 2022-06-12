import { createContext } from 'react'
import { SET_USER, RESET_USER, SET_LOADING } from './constants'

export const initialUserData = {
  currentUser: {
    image: null, // 프로필 이미지
    role: null, // 문구로 사용되는 부분
    posts: [],
    likes: [],
    comments: null,
    notifications: null,
    _id: null,
    fullName: null,
    email: null,
    createdAt: null,
    updatedAt: null,
  },
  isLoading: false,
}

export const UserContext = createContext(initialUserData)

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        currentUser: payload.currentUser,
        isLoading: false,
      }
    case RESET_USER:
      return initialUserData
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    default:
      throw new Error(`Unknown action type: ${type}`)
  }
}
