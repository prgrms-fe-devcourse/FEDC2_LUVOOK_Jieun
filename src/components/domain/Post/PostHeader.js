import { Fragment, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Text, Button } from '@components'
import { formatTime } from '@utils/format'
import UserBox from './UserBox'
import { useUserContext } from '@contexts/UserContext'
import { getItem } from '@utils/storage'
import { deletePost } from '@apis'

const AuthorizedButtons = styled.div`
  margin: 8px 0;
  display: flex;
  justify-content: flex-end;
`

const AuthorizedButton = styled(Button)`
  align-content: flex-end;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  background-color: rgba(116, 55, 55, 0.7);
  color: white;
  font-size: 16px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  &:hover {
    background-color: rgba(116, 55, 55, 0.9);
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
  const { fullName } = { fullName: unParsedFullName, ...JSON.parse(unParsedFullName) }

  return (
    <Fragment>
      <UserBox userId={userId}>
        <Text block style={{ marginBottom: '4px' }}>
          {fullName}
        </Text>
        <Text size="small" block>
          {formatTime(createdAt)}
        </Text>
      </UserBox>
      <AuthorizedButtons>
        {isAuthorized && (
          <AuthorizedButton onClick={handleClickDeleteButton}>삭제</AuthorizedButton>
        )}
      </AuthorizedButtons>
    </Fragment>
  )
}

export default PostHeader
