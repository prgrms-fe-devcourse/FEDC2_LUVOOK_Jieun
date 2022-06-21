import { useEffect, useState } from 'react'
import { Modal, Icon } from '@components'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import User from './User'
import UserSearch from './UserSearch'

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
  width: 260px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .user-search {
    width: 200px;
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
      cursor: pointer;
    }
  }
  div {
    cursor: pointer;
  }
`

const Header = () => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showModal])

  return (
    <HeaderMain>
      <HeaderContainer>
        <Logo>
          <Link to="/">LUVOOK</Link>
        </Logo>

        <HeaderNav>
          <div className="user-search">
            <Modal hasCloseButton={false} visible={showModal} onClose={() => setShowModal(false)}>
              <UserSearch showModal={showModal} />
            </Modal>
            <button onClick={() => setShowModal(true)}>
              Search for Users
              <Icon name={'search'} size={35} />
            </button>
          </div>
          <User />
        </HeaderNav>
      </HeaderContainer>
    </HeaderMain>
  )
}

export default Header
