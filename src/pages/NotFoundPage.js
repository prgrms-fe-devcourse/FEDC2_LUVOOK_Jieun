import styled from '@emotion/styled'
import { Image, Title, Button, Text } from '@components'
import { Link } from 'react-router-dom'
import NotFound from '../images/NotFound.jpg'

const NotFoundSection = styled.section`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  text-align: center;
  align-items: center;
  background: #eee;
`

const NotFoundTitle = styled(Title)`
  font-family: 'Comic Neue', cursive;
  font-size: 3rem;
  box-sizing: border-box;
  color: #363636;
`

const HomePageButton = styled(Button)`
  padding: 10px 20px;
  color: white;
  background-color: var(--color-light-primary);
  margin: 20px 0;
  display: inline-block;
  border: none;
`

const HomePageLink = styled(Link)``

const NotFoundPage = () => {
  const ImageStyle = {
    boxShadow: '-3px -3px 0px 5px rgba(212, 212, 212, 1), 5px 5px 0px 2px rgba(255, 255, 255, 1)',
  }

  return (
    <NotFoundSection>
      <NotFoundTitle level={1}>404</NotFoundTitle>
      <Image src={NotFound} width={400} style={ImageStyle} />
      <div>
        <Title level={2}>잘못된 페이지를 펼쳤습니다.</Title>
        <Text block>괜찮아요! 첫 페이지로 안내해드릴게요!</Text>
        <HomePageLink to="/">
          <HomePageButton>첫 번째 장으로 돌아가기</HomePageButton>
        </HomePageLink>
      </div>
    </NotFoundSection>
  )
}

export default NotFoundPage
