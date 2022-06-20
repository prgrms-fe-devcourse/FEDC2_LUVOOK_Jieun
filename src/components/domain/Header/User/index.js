import { useState, useEffect } from 'react'
import { Popover, Avatar, SubmitButton } from '@components'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { useUserContext } from '@contexts/UserContext'
import { getItem } from '@utils/storage'

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
  text-decoration: none;
  color: #ffffff;

  li {
    padding: 7px;
  }
  li:hover {
    cursor: pointer;
  }
`

const User = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [userPop, setUserPop] = useState(false)
  const { onLogout, onAuth, currentUserState } = useUserContext()
  const navigate = useNavigate()

  const navigateMyPage = () => {
    const userInfo = currentUserState.currentUser

    navigate(`/users/${userInfo._id}`)
  }

  const logout = async () => {
    try {
      await onLogout()
      navigate('/login')
    } catch (e) {
      alert('로그아웃에 실패하였습니다.')
    }
  }

  const checkUserAuth = async () => {
    if (getItem('jwt_token')) {
      await onAuth()
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }

  useEffect(() => {
    checkUserAuth()
    // eslint-disable-next-line
  }, [])

  return isLogin ? (
    <div>
      <Avatar size={40} id="user" onClick={() => setUserPop(true)} />
      <Popover show={userPop} targetId="user" onClose={() => setUserPop(false)}>
        <UserElement>
          <li onClick={navigateMyPage}>마이 페이지</li>
          <li onClick={logout}>로그아웃</li>
        </UserElement>
      </Popover>
    </div>
  ) : (
    <SubmitButton isLoginButton type="button" onClick={() => navigate('/login')}>
      로그인
    </SubmitButton>
  )
}

export default User
