import { useCallback } from 'react'
import { SET_USER, RESET_USER, SET_LOADING } from './constants'
import { login, logout } from '@apis'
import { setItem } from '@utils/storage'

const useActions = (dispatch) => {
  const onLogin = useCallback(async (userInfo) => {
    dispatch({ type: SET_LOADING })

    const { user, token } = await login(userInfo)
    setItem('jwt_token', token)

    dispatch({ type: SET_USER, payload: { user, token } })
  }, [])

  const onLogout = useCallback(async () => {
    dispatch({ type: SET_LOADING })
    await logout()
    dispatch({ type: RESET_USER })
  }, [])

  return {
    onLogin,
    onLogout,
  }
}

export default useActions
