import { useEffect, useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useUserContext } from '@contexts/UserContext'
import { SignUp as SignUpForm, Image, Title, Text, Input, Icon } from '@components'
import { getItem } from '@utils/storage'
import styled from '@emotion/styled'
import QuoteBackgroundImage from '@images/signup_quote_background.png'
import SignUpBackgroundImage from '@images/signup_background.jpeg'
import LuvookLogo from '@images/luvook_transparent_medium.png'

const SignUpWrapper = styled.div``

const QuoteContainer = styled.section`
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
  width: 730px;
  text-align: center;
`

const SignUpMainContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
`

const SignUpFormContainer = styled.div``

const WatchFirstText = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: var(--color-primary);
  float: right;
  cursor: pointer;

  &:hover {
    color: white;
  }
`

const SignUpPage = () => {
  const [quote, setQuote] = useState(
    '너의 장미꽃이 그토록 소중한 것은 그 꽃을 위해 네가 공들인 그 시간 때문이야 - 어린 왕자'
  )
  const navigate = useNavigate()
  const { onAuth } = useUserContext()
  const signUpRef = useRef()

  const onScrollSignUpSection = () => {
    signUpRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const onChangeQuote = (e) => {
    if (e.key === 'Enter') {
      setQuote(e.target.value)
      onScrollSignUpSection()
    }
  }

  const checkUserAuthAndRoute = async () => {
    if (getItem('jwt_token')) {
      await onAuth()
      navigate('/')
    }
  }

  useEffect(() => {
    checkUserAuthAndRoute()
    // eslint-disable-next-line
  }, [])

  return (
    <SignUpWrapper>
      <QuoteContainer>
        <QuoteSection>
          <Text style={{ fontSize: '48px', fontWeight: 'bold', color: '#743737' }}>
            좋아하는 책의 문구을 입력해주세요.
          </Text>
          <Input
            block
            type="text"
            name="quote"
            placeholder="ex) '너의 장미꽃이 그토록 소중한 것은 그 꽃을 위해 네가 공들인 그 시간 때문이야 - 어린 왕자'"
            style={{ marginTop: 20, marginBottom: 10 }}
            onKeyPress={onChangeQuote}
          />
          <Link to="/">
            <WatchFirstText>일단 구경할래요</WatchFirstText>
          </Link>
        </QuoteSection>
        <Icon
          name={'chevrons-down'}
          size={50}
          style={{ position: 'absolute', bottom: '0', marginBottom: '20px', cursor: 'pointer' }}
          onClick={onScrollSignUpSection}
        />
      </QuoteContainer>
      <SignUpMainContainer ref={signUpRef}>
        <SignUpFormContainer>
          <Image src={LuvookLogo} width="400px" />
          <Title level={1} strong color="#743737">
            회원가입
          </Title>
          <SignUpForm quote={quote} />
        </SignUpFormContainer>
        <Image src={SignUpBackgroundImage} width="100%" height="100vh" mode="cover" />
      </SignUpMainContainer>
    </SignUpWrapper>
  )
}

export default SignUpPage
