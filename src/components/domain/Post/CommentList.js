import styled from '@emotion/styled'
import { Fragment, useEffect, useState } from 'react'
import { createCommentInPost, deleteCommentInPost } from '@apis/api/post'
import { Input, Button, Text } from '@components'
import { useUserContext } from '@contexts/UserContext'
import { getItem } from '@utils/storage'
import { formatTime } from './index'
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
      <CommentsContainer>
        {commentList?.map(({ _id, comment, author, createdAt }) => (
          <UserBox tag="li" avatarSize={40} key={_id}>
            <Text block>
              {author.fullName} <Text size="small">{formatTime(createdAt)}</Text>
              {isLogin && currentUserState.currentUser._id == author._id && (
                <Text style={DeleteTextStyle} onClick={() => deleteComment(_id)}>
                  삭제
                </Text>
              )}
            </Text>
            <Text block>{comment}</Text>
          </UserBox>
        ))}
      </CommentsContainer>
      <CommentWriteContainer>
        <Input
          block
          value={comment || ''}
          placeholder="댓글을 입력해보세요!"
          onChange={writeComment}
          wrapperProps={{ style: { flex: 1 } }}
        />
        <Button onClick={sendComment}>댓글 작성</Button>
      </CommentWriteContainer>
    </Fragment>
  )
}

export default CommentList
