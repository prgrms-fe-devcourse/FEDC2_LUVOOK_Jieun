import styled from '@emotion/styled'
import { Divider } from '@components'

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 300px;
  background-color: rgba(116, 55, 55, 0.7);
  margin-top: 80px;
`
const FooterHeader = styled.div`
  width: 60%;
  height: 200px;
  border-bottom: solid 1px #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const FooterTitle = styled.div`
  width: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  > span {
    font-size: 40px;
    color: #ffffff;
    font-weight: bold;
  }
  > p {
    font-size: 20px;
    color: #ffffff;
    font-weight: bold;
  }
`

const FooterContents = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-between;
  > ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 20px;
    font-weight: 500;
    color: #ffffff;
    > li {
      display: flex;
      align-items: flex-start;
      margin: 3px 0;
      list-style: none;
      font-size: 16px;
      font-weight: 300;
      color: #ffffff;
    }
    .follow-url {
      color: #ffffff;
      font-weight: 300;
      font-size: 16px;
      text-decoration-line: none;
    }
  }
`
const FooterBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FooterIntro = styled.div`
  font-size: 16px;
  font-weight: 300;
  color: #ffffff;
`
const FooterInfo = styled.div`
  font-size: 16px;
  font-weight: 300;
  color: #ffffff;
`

const Footer = () => {
  return (
    <FooterContainer>
      <FooterHeader>
        <FooterTitle>
          <span>LUVOOK</span>
          <p>TEAM BOOKINGS</p>
        </FooterTitle>
        <FooterContents>
          <ul>
            Developers
            <li>Sugyeong Hwang</li>
            <li>Daeun Kim</li>
            <li>Sangyoon Yong</li>
            <li>Taewook Kim</li>
          </ul>
          <ul>
            Follow
            <li>
              <a href="http://github.com/sukyeongh" className="follow-url">
                waterglasses
              </a>
            </li>
            <li>
              <a href="http://github.com/dar-jeeling" className="follow-url">
                dar-jeeling
              </a>
            </li>
            <li>
              <a href="http://github.com/ryong9rrr" className="follow-url">
                ryong9rrr
              </a>
            </li>
            <li>
              <a href="http://github.com/taewook1" className="follow-url">
                taewook1
              </a>
            </li>
          </ul>

          <ul>
            Stack
            <li>JavaScript</li>
            <li>React</li>
            <li>Context API</li>
            <li>Emotion</li>
          </ul>
          <ul>
            Tool
            <li>GIT</li>
            <li>Notion</li>
            <li>Slack</li>
            <li>Eslint, Prettier</li>
          </ul>
        </FooterContents>
      </FooterHeader>
      <FooterBody>
        <FooterIntro>
          <p>
            책의 인상깊은 문구를 보고 취향에 맞는 책을 고를 수 있는 여러분을 위한 도서 추천
            서비스입니다.
          </p>
        </FooterIntro>
        <FooterInfo>
          &copy; 2022.Bookings
          <Divider type="vertical" />
          All Rights Reserved.
        </FooterInfo>
      </FooterBody>
    </FooterContainer>
  )
}

export default Footer
