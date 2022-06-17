import React, { createContext, useContext, useReducer } from 'react'
import { initialUserData } from './initialUserState'
import useActions from './actions'
import { reducer } from './reducer'

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUserContext was used outside of its Provider')
  }
  return context
}

const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  const [currentUserState, dispatch] = useReducer(reducer, initialUserData)
  const { onAuth, onLogin, onLogout } = useActions(dispatch)

  return (
    <UserContext.Provider value={{ currentUserState, onAuth, onLogin, onLogout }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
