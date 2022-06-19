import styled from '@emotion/styled'
import Bookmark from './Bookmark'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import PostContents from './PostContents'
import PostHeader from './PostHeader'
import { createLikeInPost, deleteLikeInPost } from '@apis'
import { useEffect, useState, useCallback } from 'react'
import { useUserContext } from '@contexts/UserContext'

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

const Post = ({ post, handleRerenderPost, ...props }) => {
  const [isLikeActive, setIsLikeActive] = useState(false)
  const [currentUserLikeInfo, setCurrentUserLikeInfo] = useState({})
  const { currentUserState } = useUserContext()
  const { currentUser } = currentUserState

  const getCurrentUserLikePost = useCallback(() => {
    if (!post) return []

    const postLikeUsers = post.likes.map((like) => {
      return { userId: like.user, likeId: like._id }
    })

    return postLikeUsers.filter((like) => like.userId === currentUser._id)
  }, [currentUser._id, post])

  useEffect(() => {
    if (!currentUser._id) {
      setIsLikeActive(false)
      return
    }

    const currentUserLikePost = getCurrentUserLikePost()
    if (currentUserLikePost.length > 0) {
      setIsLikeActive(true)
      setCurrentUserLikeInfo(currentUserLikePost[0])
    } else {
      setIsLikeActive(false)
      setCurrentUserLikeInfo({})
    }
  }, [currentUser, getCurrentUserLikePost, post])

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

  const onPostLike = async () => {
    const data = await createLikeInPost({ postId: postId })
    setIsLikeActive(true)
    setCurrentUserLikeInfo({ userId: data.user, likeId: data._id })
  }

  const onPostLikeDelete = async ({ userId, likeId }) => {
    await deleteLikeInPost(likeId)
    setIsLikeActive(false)
    setCurrentUserLikeInfo({})
  }

  const handleLiked = () => {
    if (!currentUser._id) {
      alert('로그인 해주세요')
      return
    }

    isLikeActive ? onPostLikeDelete(currentUserLikeInfo) : onPostLike()
    handleRerenderPost()
  }

  return (
    <div>
      <Bookmark handleClick={handleLiked} active={isLikeActive}>
        북마크
      </Bookmark>
      <PostContainer>
        <PostHeader author={author} createdAt={createdAt} />
        <PostContents title={title} image={image} />
        <CommentList comments={comments} />
        <CommentForm />
      </PostContainer>
    </div>
  )
}

export default Post
