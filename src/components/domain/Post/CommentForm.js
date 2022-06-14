import styled from '@emotion/styled'
import { Input, Button } from '@components'

const CommentFormContainer = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
`

const CommentForm = () => {
  return (
    <CommentFormContainer>
      <Input block placeholder="댓글을 입력해보세요!" wrapperProps={{ style: { flex: 1 } }} />
      <Button>댓글 작성</Button>
    </CommentFormContainer>
  )
}

export default CommentForm
