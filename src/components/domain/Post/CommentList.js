import styled from '@emotion/styled'
import { Fragment, useEffect, useState } from 'react'
import { createCommentInPost, deleteCommentInPost } from '@apis/api/post'
import { Input, Button, Text, Title, Icon } from '@components'
import { useUserContext } from '@contexts/UserContext'
import { getItem } from '@utils/storage'
import { formatTime } from '@utils/format'
import UserBox from './UserBox'

const CommentsContainer = styled.ul`
  margin: 0;
  padding: 0;
`

const CommentWriteContainer = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
`

const DeleteTextStyle = {
  marginLeft: '10px',
  fontSize: '12px',
  cursor: 'pointer',
}

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
`

const CommentIcon = styled(Icon)`
  margin-right: 4px;
  transform: scaleX(-1);
`

const List = styled.li`
  margin-bottom: 16px;
  list-style: none;
`

const CommentButton = styled(Button)`
  margin-left: 4px;
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

const CommentList = ({ postId, comments }) => {
  const { currentUserState, onAuth } = useUserContext()
  const [isLogin, setIsLogin] = useState(false)
  const [comment, setComment] = useState('')
  const [commentList, setCommentList] = useState(comments)

  const checkUserAuth = async () => {
    if (getItem('jwt_token')) {
      await onAuth()
      setIsLogin(true)
    }
  }

  useEffect(() => {
    checkUserAuth()
    // eslint-disable-next-line
  }, [])

  const deleteComment = async (commentId) => {
    const deletedComment = await deleteCommentInPost(commentId)

    const newCommentList = commentList.filter((comment) => comment._id !== deletedComment._id)
    setCommentList(newCommentList)
  }

  const sendComment = async (e) => {
    e.preventDefault()

    if (!isLogin) {
      alert('로그인한 사용자만 이용 가능합니다.')
      return
    }

    const newComment = await createCommentInPost({
      comment,
      postId,
    })

    setCommentList([...commentList, newComment])
    setComment('')
  }

  const writeComment = (e) => {
    e.preventDefault()

    if (e.key === 'Enter') {
      sendComment()
    }
    setComment(e.target.value)
  }

  return (
    <Fragment>
      <CommentHeader>
        <CommentIcon name="message-square" size={24} />
        <Title level={3}>
          {commentList.length === 0 ? '댓글을 남겨보세요.' : `댓글 ${commentList.length}개`}
        </Title>
      </CommentHeader>

      <CommentsContainer>
        {commentList?.map(({ _id, comment, author, createdAt }) => {
          const { fullName: unParsedFullName, _id: userId } = author
          const { fullName } = {
            fullName: unParsedFullName,
            ...JSON.parse(unParsedFullName),
          }
          return (
            <List key={_id}>
              <UserBox avatarSize={40} userId={userId}>
                <Text block style={{ marginBottom: '4px' }}>
                  {fullName} <Text size="small">{formatTime(createdAt)}</Text>
                  {isLogin && currentUserState.currentUser._id === author._id && (
                    <Text style={DeleteTextStyle} onClick={() => deleteComment(_id)}>
                      삭제
                    </Text>
                  )}
                </Text>
                <Text block>{comment}</Text>
              </UserBox>
            </List>
          )
        })}
      </CommentsContainer>

      <CommentWriteContainer>
        <Input
          block
          value={comment || ''}
          placeholder="댓글을 입력해보세요!"
          onChange={writeComment}
          wrapperProps={{ style: { flex: 1 } }}
        />
        <CommentButton onClick={sendComment}>댓글 작성</CommentButton>
      </CommentWriteContainer>
    </Fragment>
  )
}

export default CommentList
