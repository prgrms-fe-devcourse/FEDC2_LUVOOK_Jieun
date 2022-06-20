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
  align-items: flex-end;
  flex: 0;
  height: 60px;

  Button {
    border-radius: 30px;
    height: 30px;
    background-color: transparent;
    border: 2px solid #3f51b5;
    color: #3f51b5;
    margin-left: 8px;
  }
`

const PostHeader = ({ postId, author, createdAt, onClose }) => {
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
    if (window.confirm('정말 게시물을 삭제할까요?')) {
      try {
        await deletePost(postId)
      } catch (e) {
        console.error('게시물 삭제에 실패했습니다.', e)
      }
      onClose && onClose()
    }
  }

  const { fullName: unParsedFullName, _id: userId } = author
  const { fullName, quote } = { fullName: unParsedFullName, ...JSON.parse(unParsedFullName) }

  return (
    <Fragment>
      <UserBox userId={userId}>
        <Text block>{fullName}</Text>
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
