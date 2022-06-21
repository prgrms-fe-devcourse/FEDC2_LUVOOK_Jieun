import { useState, useEffect, Fragment } from 'react'
import {
  Header,
  UserEditForm,
  UserInfo,
  BookListSlider,
  Title,
  Icon,
  Modal,
  Post,
} from '@components'
import styled from '@emotion/styled'
import { useUserContext } from '@contexts/UserContext'
import { getItem } from '@utils/storage'
import { useLocation } from 'react-router-dom'
import { getUserInfo, readPost } from '@apis'
import { parseListTitle } from '@utils/common'

const UserPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -50px;
`

const SliderWrapper = styled.div``

const NameHighLight = styled.span`
  color: black;
`

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`

const PostSectionHeader = styled.header`
  width: 1200px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 30px;
`
const UsersPage = () => {
  const location = useLocation()
  const { currentUserState, onAuth } = useUserContext()
  const [userInfo, setUserInfo] = useState()
  const [isMyPage, setIsMyPage] = useState(false)

  const [isRerender, setIsRerender] = useState(true)

  const [likePostList, setLikePostList] = useState([])
  const [writtenPostList, setWrittenPostList] = useState([])

  const [showPostModal, setShowPostModal] = useState(false)
  const [post, setPost] = useState(null)

  const closePostModal = () => {
    setShowPostModal(false)
    setPost(null)
  }

  const handleClickPost = (post) => {
    setPost(post)
    setShowPostModal(true)
  }

  const getLikePostList = async (userInfo) => {
    const userLikeList = await Promise.all(
      userInfo.likes.map(async ({ post }) => await readPost(post))
    )
    setLikePostList(parseListTitle(userLikeList))
  }

  const getWrittenPostList = async (userInfo) => {
    const userWrittenList = await Promise.all(
      userInfo.posts.map(async (post) => await readPost(post))
    )
    setWrittenPostList(parseListTitle(userWrittenList))
  }

  const getOtherUserInfo = async (userId) => {
    const userInfo = await getUserInfo(userId)
    setUserInfo(userInfo)
  }

  const checkUserAuth = async () => {
    if (getItem('jwt_token')) {
      await onAuth()
    }
  }

  const checkUserIsMyPage = (currentRouteUserId) => {
    checkUserAuth()
    const currentUserId = currentUserState.currentUser._id
    setIsMyPage(currentUserId === currentRouteUserId)
  }

  useEffect(() => {
    setIsRerender(true)
  }, [post])

  useEffect(() => {
    const currentRouteUserId = location.pathname.split('/')[2]
    checkUserIsMyPage(currentRouteUserId)
    getOtherUserInfo(currentRouteUserId)
    // eslint-disable-next-line
  }, [location])

  useEffect(() => {
    if (userInfo) {
      getLikePostList(userInfo)
      getWrittenPostList(userInfo)
    } else {
      setLikePostList([])
      setWrittenPostList([])
    }

    setIsRerender(false)
  }, [userInfo])

  useEffect(() => {
    if (!isRerender) return

    if (userInfo) {
      getLikePostList(userInfo)
      getWrittenPostList(userInfo)
    } else {
      setLikePostList([])
      setWrittenPostList([])
    }

    setIsRerender(false)
  }, [isRerender])

  return (
    <Fragment>
      <UserPageContainer>
        <Header />
        {isMyPage ? <UserEditForm /> : <UserInfo userInfo={userInfo} />}
      </UserPageContainer>

      <HeaderWrapper>
        <PostSectionHeader>
          <Icon name="feather" size="40" />
          <Title style={{ marginLeft: '10px', color: '#a5a3af' }}>
            <NameHighLight>{userInfo && JSON.parse(userInfo.fullName).fullName}</NameHighLight>님이
            작성한 게시물
          </Title>
        </PostSectionHeader>
      </HeaderWrapper>

      <SliderWrapper>
        <BookListSlider
          style={{ width: '1200px' }}
          posts={writtenPostList}
          handleClick={handleClickPost}
          grid={{ fill: 'row', rows: 1 }}
        />
      </SliderWrapper>

      <HeaderWrapper>
        <PostSectionHeader>
          <Icon name="bookmark" size="40" />
          <Title style={{ marginLeft: '10px', color: '#a5a3af' }}>
            <NameHighLight>{userInfo && JSON.parse(userInfo.fullName).fullName}</NameHighLight>님이
            좋아요한 게시물
          </Title>
        </PostSectionHeader>
      </HeaderWrapper>
      <SliderWrapper>
        <BookListSlider
          style={{ width: '1200px' }}
          posts={likePostList}
          handleClick={handleClickPost}
          grid={{ fill: 'row', rows: 1 }}
        />
      </SliderWrapper>

      <Modal visible={showPostModal} onClose={closePostModal}>
        <Post
          post={post}
          onClose={closePostModal}
          handleRerenderPost={() => {
            setIsRerender(true)
          }}
          setPost={setPost}
        />
      </Modal>
    </Fragment>
  )
}

export default UsersPage
