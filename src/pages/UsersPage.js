import { useState, useEffect } from 'react'
import { Header, UserEditForm, UserInfo } from '@components'
import styled from '@emotion/styled'
import { useUserContext } from '@contexts/UserContext'
import { getItem } from '@utils/storage'
import { useLocation } from 'react-router-dom'
import { getUserInfo } from '@apis'

const UserPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const UsersPage = () => {
  const location = useLocation()
  const { currentUserState, onAuth } = useUserContext()
  const [userInfo, setUserInfo] = useState()
  const [isMyPage, setIsMyPage] = useState(false)

  const getOtherUserInfo = async (userId) => {
    const userInfo = await getUserInfo(userId)
    setUserInfo(userInfo)
  }

  const checkUserAuth = async () => {
    if (getItem('jwt_token')) {
      await onAuth()
    }
  }

  const checkUserIsMyPage = (currentRouteUserId) => {
    checkUserAuth()

    const currentUserId = currentUserState.currentUser._id
    setIsMyPage(currentUserId === currentRouteUserId)
  }

  useEffect(() => {
    const currentRouteUserId = location.pathname.split('/')[2]

    checkUserIsMyPage(currentRouteUserId)
    getOtherUserInfo(currentRouteUserId)
    // eslint-disable-next-line
  }, [location])

  return (
    <UserPageContainer>
      <Header />
      {isMyPage ? <UserEditForm /> : <UserInfo userInfo={userInfo} />}
    </UserPageContainer>
  )
}

export default UsersPage
