import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useUserContext } from '@contexts/UserContext'
import { Login as LoginForm, Image, Text } from '@components'
import { getItem } from '@utils/storage'
import styled from '@emotion/styled'
import BookBackgroundImage from '../images/login_background.jpeg'
import LuvookLogo from '../images/luvook_transparent_medium.png'

const LoginPageContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
`

const LoginFormContainer = styled.div``

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
    <LoginPageContainer>
      <Image src={BookBackgroundImage} width="100%" height="100vh" />
      <LoginFormContainer>
        <Image src={LuvookLogo} width="400px" />
        <LoginForm />
        <Link to="/sign-up">
          <Text size="small">아이디가 없으신가요? 지금 가입하기</Text>
        </Link>
      </LoginFormContainer>
    </LoginPageContainer>
  )
}

export default LoginPage
