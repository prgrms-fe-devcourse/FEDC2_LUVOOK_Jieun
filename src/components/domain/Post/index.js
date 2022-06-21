import styled from '@emotion/styled'
import Bookmark from './Bookmark'
import CommentList from './CommentList'
import PostContents from './PostContents'
import PostHeader from './PostHeader'
import { createLikeInPost, deleteLikeInPost } from '@apis'
import { useEffect, useState, useCallback } from 'react'
import { useUserContext } from '@contexts/UserContext'

const Container = styled.div`
  padding-top: 24px;
`

const PostContainer = styled.div`
  position: relative;
  width: 780px;
  max-height: 85vh;
  padding: 0 32px 16px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(116, 55, 55, 0.6);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(116, 55, 55, 0.5);
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`

const Section = styled.section`
  padding: 16px;
`

const defaultPostProps = {
  likes: [],
  comments: [],
  _id: 'default',
  title: null,
  author: null,
  createdAt: '',
}

const Post = ({ post, onClose, handleRerenderPost, setPost, ...props }) => {
  const [isLikeActive, setIsLikeActive] = useState(false)
  const [likeList, setLikeList] = useState([])
  const [isCommentActive, setIsCommentActive] = useState(false)
  const [currentUserLikeInfo, setCurrentUserLikeInfo] = useState({})
  const { currentUserState } = useUserContext()
  const { currentUser } = currentUserState

  const getCurrentUserLikePost = useCallback(() => {
    if (!post) return []

    setLikeList(post.likes)
    const postLikeUsers = post.likes.map((like) => {
      return { userId: like.user, likeId: like._id }
    })

    return postLikeUsers.filter((like) => like.userId === currentUser._id)
  }, [currentUser._id, post])

  useEffect(() => {
    if (!currentUser._id) {
      setIsLikeActive(false)
      setIsCommentActive(false)
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

    setIsCommentActive(true)
  }, [currentUser, getCurrentUserLikePost, post])

  if (!post) return

  const {
    // likes,
    comments,
    _id: postId,
    title: titleObj,
    author,
    createdAt,
  } = { ...defaultPostProps, ...post }

  const onPostLike = async () => {
    setIsLikeActive(true)
    const data = await createLikeInPost({ postId: postId })
    setCurrentUserLikeInfo({ userId: data.user, likeId: data._id })
    setPost({
      ...post,
      likes: [...likeList, data],
    })
  }

  const onPostLikeDelete = async ({ userId, likeId }) => {
    const deletedLike = await deleteLikeInPost(likeId)
    setIsLikeActive(false)
    setCurrentUserLikeInfo({})

    const deletedLikeList = likeList.filter((like) => like._id !== deletedLike._id)
    setPost({
      ...post,
      likes: deletedLikeList,
    })
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
    <Container>
      <Bookmark handleClick={handleLiked} active={isLikeActive} />
      <PostContainer>
        <PostHeader
          postId={postId}
          author={author}
          createdAt={createdAt}
          onClose={() => {
            onClose()
            handleRerenderPost()
          }}
        />
        <Section>
          <PostContents titleObj={titleObj} />
        </Section>
        <Section>
          <CommentList post={post} comments={comments} active={isCommentActive} setPost={setPost} />
        </Section>
      </PostContainer>
    </Container>
  )
}

export default Post
