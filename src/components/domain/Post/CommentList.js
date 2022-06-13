import styled from '@emotion/styled'
import Comment from './Comment'

const CommentsContainer = styled.ul`
  margin: 0;
  padding: 0;
`

const CommentList = ({ comments }) => {
  return (
    <CommentsContainer>
      {comments?.map(({ _id, comment, author, createdAt }, index) => (
        <Comment key={index} author={author} comment={comment} createdAt={createdAt} />
      ))}
    </CommentsContainer>
  )
}

export default CommentList
