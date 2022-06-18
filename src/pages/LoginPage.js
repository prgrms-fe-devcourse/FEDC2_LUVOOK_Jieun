import { Login as LoginForm } from '@components'
import { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '@contexts/UserContext'
import { getItem } from '@utils/storage'

const LoginPage = () => {
  const navigate = useNavigate()
  const { onAuth } = useUserContext()

  const checkUserAuthAndRoute = async () => {
    if (getItem('jwt_token')) {
      await onAuth()
      navigate('/')
    }
  }

  useEffect(() => {
    checkUserAuthAndRoute()
  }, [])

  return (
    <Fragment>
      <LoginForm />
    </Fragment>
  )
}

export default LoginPage
