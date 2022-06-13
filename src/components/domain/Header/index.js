import { useState } from 'react'
import { Popover, Modal, Avatar, Icon, Text } from '@components'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

const HeaderMain = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`
const HeaderContainer = styled.div`
  width: 89%;
  max-width: 1280px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const Logo = styled.button`
  font-size: 48px;
  font-weight: bold;
  color: #743737;
  background-color: transparent;
  border: none;
  a {
    text-decoration: none;
    color: #743737;
  }
`

const HeaderNav = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  .user-search {
    width: 70%;
    > button {
      width: 100%;
      height: 50px;
      background-color: transparent;
      font-size: 16px;
      font-weight: bold;
      color: #666666;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 25px;
      border: solid #743737;
      padding: 0 10px 0 20px;
      margin-bottom: 1px;
      cursor: pointer;
    }
  }
  div {
    cursor: pointer;
  }
`

const NotificationElement = styled.div`
  position: absolute;
  margin-left: 10px;
  top: 5px;
  right: 0;
  width: 210px;
  height: auto;
  background-color: #743737;
  color: white;
  list-style: none;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  > button {
    margin: 7px;
    background-color: transparent;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
  }
`

const UserElement = styled.div`
  position: absolute;
  margin-left: 10px;
  top: 5px;
  right: 0;
  width: 120px;
  height: auto;
  background-color: #743737;
  color: white;
  list-style: none;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  a {
    text-decoration: none;
    color: #ffffff;
    li {
      padding: 7px;
    }
    li:hover {
      cursor: pointer;
    }
  }
`

const BadgeContainer = styled.div`
  position: relative;
  display: inline-block;
`

const Super = styled.sup`
  position: absolute;
  top: 2px;
  right: 7px;
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 20px;
  color: white;
  background-color: #ff4040;
  transform: translate(50%, -50%);
`

const Badge = ({ children, count, maxCount, showZero, ...props }) => {
  return (
    <BadgeContainer {...props}>
      {children}
      {count > 0 || (count === 0 && showZero) ? (
        <Super> {maxCount && count > maxCount ? `${maxCount}+` : count}</Super>
      ) : null}
    </BadgeContainer>
  )
}

const Header = () => {
  const [notificationpop, setNotificationpop] = useState(false)
  const [userpop, setUserpop] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showPost, setShowPost] = useState(false)

  return (
    <HeaderMain>
      <HeaderContainer>
        <Logo>
          <Link to="/">LUVOOK</Link>
        </Logo>

        <HeaderNav>
          <div className="user-search">
            <Modal visible={showModal} onClose={() => setShowModal(false)}>
              <h1>사용자 검색 모달</h1>
            </Modal>
            <button onClick={() => setShowModal(true)}>
              Search for Users
              <Icon name={'search'} size={35} />
            </button>
          </div>
          <div>
            <Badge count={0} maxCount={99} showZero={false}>
              <Icon
                name={'bell'}
                size={40}
                id="notification"
                onClick={() => setNotificationpop(true)}
              />
              <Popover
                show={notificationpop}
                targetId="notification"
                onClose={() => setNotificationpop(false)}
              >
                <NotificationElement>
                  <Modal visible={showPost} onClose={() => setShowPost(false)}>
                    <h1>Post</h1>
                  </Modal>
                  {NOTIFICATIONS.map((comments) => (
                    <button onClick={() => setShowPost(true)} key={comments._id}>
                      {comments.comments}
                    </button>
                  ))}
                </NotificationElement>
              </Popover>
            </Badge>
          </div>
          <div>
            <Avatar
              src={'https://picsum.photos/200'}
              size={40}
              id="user"
              onClick={() => setUserpop(true)}
            />
            <Popover show={userpop} targetId="user" onClose={() => setUserpop(false)}>
              <UserElement>
                <Link to="/users/:username">
                  <li>마이 페이지</li>
                </Link>
                <Link to="/login">
                  <li>로그아웃</li>
                </Link>
              </UserElement>
            </Popover>
          </div>
        </HeaderNav>
      </HeaderContainer>
    </HeaderMain>
  )
}

export default Header
