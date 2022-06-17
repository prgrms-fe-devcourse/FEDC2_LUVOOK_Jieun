import { useCallback } from 'react'
import { SET_USER, RESET_USER, SET_LOADING } from './constants'
import { login, logout, getAuthUser } from '@apis'
import { setItem, removeItem } from '@utils/storage'

const useActions = (dispatch) => {
  const onAuth = useCallback(async () => {
    dispatch({ type: SET_LOADING })

    const user = await getAuthUser()

    dispatch({ type: SET_USER, payload: { user } })
  }, [])

  const onLogin = useCallback(async (userInfo) => {
    dispatch({ type: SET_LOADING })

    const { user, token } = await login(userInfo)
    setItem('jwt_token', token)

    dispatch({ type: SET_USER, payload: { user, token } })
  }, [])

  const onLogout = useCallback(async () => {
    dispatch({ type: SET_LOADING })

    removeItem('jwt_token')
    await logout()

    dispatch({ type: RESET_USER })
  }, [])

  return {
    onAuth,
    onLogin,
    onLogout,
  }
}

export default useActions
