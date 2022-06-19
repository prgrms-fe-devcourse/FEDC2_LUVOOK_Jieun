import { Fragment, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Text, Button } from '@components'
import { formatTime } from './index'
import UserBox from './UserBox'
import { useUserContext } from '@contexts/UserContext'
import { getItem } from '@utils/storage'
import { deletePost } from '@apis'

const AuthorizedButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`

const PostHeader = ({ postId, author, createdAt }) => {
  const { currentUserState, onAuth } = useUserContext()
  const [isLogin, setIsLogin] = useState(false)
  const isAuthorized = isLogin && currentUserState?.currentUser?._id === author._id

  const checkUserAuth = async () => {
    if (getItem('jwt_token')) {
      await onAuth()
      setIsLogin(true)
    }
  }

  useEffect(() => {
    checkUserAuth()
  }, [])

  const handleClickDeleteButton = async (e) => {
    e.preventDefault()

    if (!isAuthorized) {
      console.error('본인이 작성한 게시물이 아닙니다.')
      return
    }

    // TODO
    // 게시물을 삭제하면 자동으로 모달이 닫히게 만들어야 한다.
    await deletePost(postId)
  }

  return (
    <Fragment>
      <UserBox image={author.image}>
        <Text block>{author.fullName}</Text>
        <Text block>{formatTime(createdAt)}</Text>
      </UserBox>
      {isAuthorized && (
        <AuthorizedButtons>
          <Button>수정</Button>
          <Button onClick={handleClickDeleteButton}>삭제</Button>
        </AuthorizedButtons>
      )}
    </Fragment>
  )
}

export default PostHeader
