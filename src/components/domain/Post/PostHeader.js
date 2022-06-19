import { Fragment, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Text, Button } from '@components'
import { formatTime } from './index'
import UserBox from './UserBox'
import { useUserContext } from '@contexts/UserContext'
import { getItem } from '@utils/storage'

const AuthorizedButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`

const PostHeader = ({ author, createdAt }) => {
  const { currentUserState, onAuth } = useUserContext()
  const [isLogin, setIsLogin] = useState(false)
  const isShowAuthorizedButtons = isLogin && currentUserState?.currentUser?._id === author._id

  const checkUserAuth = async () => {
    if (getItem('jwt_token')) {
      await onAuth()
      setIsLogin(true)
    }
  }

  useEffect(() => {
    checkUserAuth()
  }, [])

  return (
    <Fragment>
      <UserBox image={author.image}>
        <Text block>{author.fullName}</Text>
        <Text block>{formatTime(createdAt)}</Text>
      </UserBox>
      {isShowAuthorizedButtons && (
        <AuthorizedButtons>
          <Button>수정</Button>
          <Button>삭제</Button>
        </AuthorizedButtons>
      )}
    </Fragment>
  )
}

export default PostHeader
