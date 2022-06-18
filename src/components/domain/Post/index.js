import styled from '@emotion/styled'
import Bookmark from './Bookmark'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import PostContents from './PostContents'
import PostHeader from './PostHeader'

//TODO 상수로 옮겨야 한다.
const PLACEHOLDER_IMAGE_SRC = 'https://via.placeholder.com/200?text=LUVOOK'

// TODO
// utils로 옮겨야 할 것 같다.
export const formatTime = (unFormattedTime) => {
  const date = new Date(unFormattedTime)
  const day = date.toLocaleDateString()
  const time = date.toTimeString().slice(0, 5)
  return `${day} ${time}`
}

const PostContainer = styled.article`
  position: relative;
  width: 780px;
  max-height: 85vh;
  padding: 16px;
  overflow: auto;
`

const defaultPostProps = {
  likes: [],
  comments: [],
  _id: 'default',
  image: PLACEHOLDER_IMAGE_SRC,
  title: {
    bookTitle: '',
    postContent: '',
    postQuote: '',
  },
  channel: '',
  author: {
    image: '',
    fullName: '',
  },
  createdAt: '',
}

const Post = ({ post, ...props }) => {
  if (!post) return

  const {
    likes,
    comments,
    _id: postId,
    image,
    title,
    channel,
    author,
    createdAt,
  } = { ...defaultPostProps, ...post }

  return (
    <PostContainer>
      <Bookmark>북마크</Bookmark>
      <PostHeader author={author} createdAt={createdAt} />
      <PostContents title={title} image={image} />
      <CommentList comments={comments} />
      <CommentForm />
    </PostContainer>
  )
}

export default Post
