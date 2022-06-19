import { Fragment, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useUserContext } from '@contexts/UserContext'
import { Login as LoginForm, Image, Title, Text } from '@components'
import { getItem } from '@utils/storage'
import styled from '@emotion/styled'
import LoginBackgroundImage from '@images/login_background.jpeg'
import LuvookLogo from '@images/luvook_transparent_medium.png'

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
      <Image src={LoginBackgroundImage} width="100%" height="100vh" mode="cover" />
      <LoginFormContainer>
        <Image src={LuvookLogo} width="400px" />
        <Title level={1} strong color="#743737">
          로그인
        </Title>
        <LoginForm />
        <Link to="/sign-up">
          <Text size="small">아이디가 없으신가요? 지금 가입하기</Text>
        </Link>
      </LoginFormContainer>
    </LoginPageContainer>
  )
}

export default LoginPage
