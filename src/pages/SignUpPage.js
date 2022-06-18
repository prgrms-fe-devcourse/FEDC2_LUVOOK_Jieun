import { SignUp as SignUpForm } from '@components'
import { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '@contexts/UserContext'
import { getItem } from '@utils/storage'

const SignUpPage = () => {
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
      <SignUpForm />
    </Fragment>
  )
}

export default SignUpPage
