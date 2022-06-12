import React, { createContext, useContext, useState, useReducer, useCallback } from 'react'
import { reducer, initialUserData } from './reducer'
import { SET_USER, RESET_USER, SET_LOADING, SET_LOADING_DONE } from './constants'
// 동작 테스트를 위한 더미데이터, api 구현 후 대체할 부분
import { handleLogin, handleLogout, handleAuth } from './test'

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUserContext was used outside of its Provider')
  }
  return context
}

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [currentUserState, dispatch] = useReducer(reducer, initialUserData)
  const [isAuth, setIsAuth] = useState(false) // 현재 사용자의 auth 정보

  const onAuth = useCallback(
    // TODO: api 통신을 통해 사용자가 인증이 되었는지 확인합니다.
    async (token) => {
      dispatch({ type: SET_LOADING })
      const userData = await handleAuth(token)
      if (userData.user) {
        setIsAuth(true)
      }
      dispatch({ type: SET_LOADING_DONE })
    },
    [handleAuth]
  )

  const onLogin = useCallback(
    async (loginInfo) => {
      // TODO: api 통신을 통해, 로그인 하고 {user, token} 객체를 받아옵니다.
      dispatch({ type: SET_LOADING })
      const userData = await handleLogin(loginInfo)
      const { user, token } = userData
      // 인증 후 로그인
      await onAuth(token)
      dispatch({ type: SET_USER, payload: user })
    },
    [handleLogin]
  )

  const onLogout = useCallback(async () => {
    // TODO: api 통신을 통해, 로그아웃 합니다.
    dispatch({ type: SET_LOADING })
    await handleLogout()
    dispatch({ type: RESET_USER })
    setIsAuth(false)
  }, [handleLogout])

  return (
    <UserContext.Provider value={{ currentUserState, isAuth, onAuth, onLogin, onLogout }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
