import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '@contexts/UserContext'
import { SignUp as SignUpForm, Image, Title, Text, Input } from '@components'
import { getItem } from '@utils/storage'
import styled from '@emotion/styled'
import QuoteBackgroundImage from '../images/signup_quote_background.png'
import SignUpBackgroundImage from '../images/signup_background.jpeg'
import LuvookLogo from '../images/luvook_transparent_medium.png'

const QuoteWrappper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${QuoteBackgroundImage});
  background-size: cover;
`

const QuoteSection = styled.div`
  width: 670px;
  text-align: center;
`

const SignUpMainContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
`

const SignUpFormContainer = styled.div``

const SignUpPage = () => {
  const [quote, setQuote] = useState('')

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
      <QuoteWrappper>
        <QuoteSection>
          <Text style={{ fontSize: '48px', fontWeight: 'bold', color: '#743737' }}>
            좋아하는 책의 문구을 입력해주세요.
          </Text>
          <Input
            block
            type="text"
            name="quote"
            placeholder="문구를 입력해주세요."
            style={{ marginTop: 20 }}
            onChange={(e) => setQuote(e.target.value)}
          />
        </QuoteSection>
      </QuoteWrappper>
      <SignUpMainContainer>
        <SignUpFormContainer>
          <Image src={LuvookLogo} width="400px" />
          <Title level={1} strong color="#743737">
            회원가입
          </Title>
          <SignUpForm quote={quote} />
        </SignUpFormContainer>
        <Image src={SignUpBackgroundImage} width="100%" height="100vh" mode="cover" />
      </SignUpMainContainer>
    </Fragment>
  )
}

export default SignUpPage
