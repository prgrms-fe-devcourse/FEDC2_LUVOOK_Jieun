import styled from '@emotion/styled'
import { Avatar, Text, Title, Image, Input, Button } from '@components'

const PostContainer = styled.article`
  position: relative;
  width: 780px;
  max-height: 85vh;
  padding: 16px;
  overflow: auto;
`

// TODO
// 1. formatTime은 constants로 옮겨야한다.
const formatTime = (unFormattedTime) => {
  const date = new Date(unFormattedTime)
  const day = date.toLocaleDateString()
  const time = date.toTimeString().slice(0, 5)
  return `${day} ${time}`
}
// 2. defaultImage를 만들면 좋을 것 같다. (아래 이미지는 임시 이미지)
const defaultImage = 'https://source.unsplash.com/random'

/**************** Bookmark *****************/
const Bookmark = styled.button`
  position: absolute;
  top: -24px;
  right: 40px;
`

/**************** PostHeader *****************/
const PostHeaderContainer = styled.div`
  display: flex;
  align-items: center;
`

const PostHeader = ({ author, createdAt }) => {
  const { _id: userId, image, fullName: username } = author

  return (
    <PostHeaderContainer>
      <Avatar src={image || defaultImage} />
      <div>
        <Text block>{username}</Text>
        <Text block>{formatTime(createdAt)}</Text>
      </div>
    </PostHeaderContainer>
  )
}

/**************** Contents *****************/

const PostContents = ({ title, image }) => {
  return (
    <>
      <Title style={{ margin: '0 auto', textAlign: 'center' }}>{title}</Title>
      <Image
        block
        src={image || defaultImage}
        width="200px"
        height="300px"
        style={{ margin: '0 auto' }}
      />
    </>
  )
}

/**************** Comments *****************/

const CommentsContainer = styled.ul`
  margin: 0;
  padding: 0;
`

const UserCommentContainer = styled.li`
  display: flex;
  align-items: center;
  text-decoration: none;
`

const UserComment = ({ author, comment, createdAt }) => {
  const { fullName: username, image } = author

  return (
    <UserCommentContainer>
      <Avatar src={image || defaultImage} size={40} />
      <div>
        <Text block>
          {username} ({formatTime(createdAt)})
        </Text>
        <Text block>{comment}</Text>
      </div>
    </UserCommentContainer>
  )
}

const Comments = ({ comments }) => {
  return (
    <CommentsContainer>
      {comments?.map(({ _id, comment, author, createdAt }, index) => (
        <UserComment key={index} author={author} comment={comment} createdAt={createdAt} />
      ))}
    </CommentsContainer>
  )
}

/**************** Comment Form *****************/

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

const Post = ({ post, ...props }) => {
  if (!post) return
  // TODO
  // likes를 사용할지 여부
  const { likes, comments, _id: postId, image, title, channel, author, createdAt } = post

  return (
    <PostContainer>
      <Bookmark>북마크</Bookmark>
      <PostHeader author={author} createdAt={createdAt} />
      <PostContents title={title} image={image} />
      <Comments comments={comments} />
      <CommentForm />
    </PostContainer>
  )
}

export default Post
