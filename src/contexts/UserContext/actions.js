import { useCallback } from 'react'
import { SET_USER, RESET_USER, SET_LOADING } from './constants'
import { login, logout, signUp, getAuthUser, updateUserName } from '@apis'
import { getItem, setItem, removeItem } from '@utils/storage'

const useActions = (dispatch) => {
  const onAuth = useCallback(async () => {
    dispatch({ type: SET_LOADING })

    const user = await getAuthUser()

    if (user) {
      const token = getItem('jwt_token')
      dispatch({ type: SET_USER, payload: { user, token } })
    }
  }, [dispatch])

  const onLogin = useCallback(
    async (userInfo) => {
      dispatch({ type: SET_LOADING })

      const { user, token } = await login(userInfo)
      setItem('jwt_token', token)

      dispatch({ type: SET_USER, payload: { user, token } })
    },
    [dispatch]
  )

  const onLogout = useCallback(async () => {
    dispatch({ type: SET_LOADING })

    removeItem('jwt_token')
    await logout()

    dispatch({ type: RESET_USER })
  }, [dispatch])

  const onSignUp = useCallback(
    async (userInfo) => {
      dispatch({ type: SET_LOADING })

      const { user, token } = await signUp(userInfo)
      setItem('jwt_token', token)

      dispatch({ type: SET_USER, payload: { user, token } })
    },
    [dispatch]
  )

  const onUpdateUserInfo = useCallback(
    async (userInfo) => {
      const user = await updateUserName(userInfo)
      const token = getItem('jwt_token')

      dispatch({ type: SET_USER, payload: { user, token } })
    },
    [dispatch]
  )

  return {
    onAuth,
    onLogin,
    onLogout,
    onSignUp,
    onUpdateUserInfo,
  }
}

export default useActions
