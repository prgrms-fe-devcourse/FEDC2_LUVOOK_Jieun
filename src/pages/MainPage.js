import styled from '@emotion/styled'
import {
  Header,
  Banner,
  BookListSlider,
  Input,
  Button,
  Select,
  Modal,
  NewPostForm,
  Post,
  Navbar,
  Icon,
  Footer,
} from '@components'
import { useState, useEffect, Fragment } from 'react'
import { useUserContext } from '@contexts/UserContext'
import { getItem } from '@utils/storage'
import {
  getAllPosts,
  getChannelList,
  getPostListInChannel,
  getChannelInfo,
  getSearchedBookList,
  readPost,
} from '@apis'
import { parseListTitle } from '@utils/common'

const CONFIRM_MESSAGE = {
  CANCEL: '작성중인 글이 저장되지 않습니다. 글 작성을 취소할까요?',
  SUBMIT: '글을 작성할까요?',
}

const CATEGORY_ALL = { id: 0, name: 'ALL' }

const SEARCH_TYPE = {
  ALL: '전체 검색',
  TITLE: '책 제목',
  CONTENT: '내용',
  QUOTE: '구절',
}

const SearchBar = styled.div`
  padding: 8px 0 8px 100px;
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
`

const MainPageInput = styled(Input)`
  width: 400px;
  height: 50px;
  // TODO: 이 후 변수로 사용
  border: 1px solid rgba(116, 55, 55, 0.7);
`

const MainPageButton = styled(Button)`
  margin-left: ${({ ml }) => (ml ? ml : '4px')};
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: rgba(116, 55, 55, 0.7);
  color: white;
  font-size: 16px;
  font-weight: 600;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  &:hover {
    background-color: rgba(116, 55, 55, 0.9);
  }
`

const sortByLatest = (post1, post2) => {
  return Date.parse(post2.createdAt) - Date.parse(post1.createdAt)
}

const MainPageSection = styled.section`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MainPageNav = styled(Navbar)`
  font-size: 24px;
  width: 1200px;
`

const SliderWrapper = styled.div``

const MainPageSelect = styled(Select)`
  width: 120px;
  height: 50px;
  margin-right: 10px;
  border: none;
  // TODO: 이 후 상수로 대체할 부분
  color: rgba(116, 55, 55, 0.7);
  border: 1px solid rgba(116, 55, 55, 0.7);
  font-size: 16px;
`

const MainPage = () => {
  const { onAuth } = useUserContext()
  const [isLogin, setIsLogin] = useState(false)
  const [isRerender, setIsRerender] = useState(true)
  const [postList, setPostList] = useState([])
  const [categoryName, setCategoryName] = useState(CATEGORY_ALL.name)
  const [searchedKeyword, setSearchedKeyword] = useState('')
  const [searchType, setSearchType] = useState(SEARCH_TYPE['ALL'])
  const [allCategories, setAllCategories] = useState([])
  const [showPostModal, setShowPostModal] = useState(false)
  const [post, setPost] = useState(null)
  const [showNewPostFormModal, setShowNewPostFormModal] = useState(false)

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

  useEffect(() => {
    if (showPostModal || showNewPostFormModal) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      if (!showPostModal || !showNewPostFormModal) {
        document.body.style.overflow = 'auto'
      }
    }
  }, [showPostModal, showNewPostFormModal])

  const handleClickNewPostButton = () => {
    if (!isLogin) {
      window.alert('로그인을 해주세요!') // 또는 로그인을 유도한다.
      return
    }
    setShowNewPostFormModal(true)
  }

  const closePostModal = () => {
    setShowPostModal(false)
    setPost(null)
  }

  const closeNewPostFormModal = async (action = 'CANCEL', callbackFn) => {
    if (window.confirm(CONFIRM_MESSAGE[action])) {
      if (callbackFn) {
        await callbackFn()
      }
      setShowNewPostFormModal(false)
      setIsRerender(true)
    }
  }

  const getAllChannels = async () => {
    const channelList = await getChannelList()
    const categories = channelList.map((channel) => ({ id: channel._id, name: channel.name }))
    categories.unshift(CATEGORY_ALL)
    setAllCategories(categories)
  }

  const getAllPost = async () => {
    const totalPostList = await getAllPosts()
    totalPostList.sort(sortByLatest)
    setPostList(parseListTitle(totalPostList))
  }

  const getChannelPost = async (channelName) => {
    const channelInfo = await getChannelInfo(channelName)
    const channelPostList = await getPostListInChannel(channelInfo._id)
    setPostList(parseListTitle(channelPostList))
  }

  const handleClickPost = (post) => {
    setPost(post)
    setShowPostModal(true)
  }

  const activeItemStyle = {
    fontWeight: 'bold',
    color: '#743737',
  }

  useEffect(() => {
    setIsRerender(true)
    setPost(post)
  }, [post])

  useEffect(() => {
    if (!isRerender) return

    if (categoryName === 'ALL') {
      getAllPost()
    } else {
      getChannelPost(categoryName)
    }

    setIsRerender(false)
  }, [categoryName, isRerender])

  useEffect(() => {
    getAllChannels()
    getAllPost()
  }, [])

  const onChangeSearchedKeyword = (e) => {
    setSearchedKeyword(e.target.value)
  }

  const getDetailPostList = async (posts) => {
    const getDetailPostList = await Promise.all(posts.map(async ({ _id }) => await readPost(_id)))
    setPostList(parseListTitle(getDetailPostList).sort(sortByLatest))
  }

  const onSearch = async () => {
    if (!searchedKeyword) return
    const searchedResult = await getSearchedBookList(searchedKeyword)
    const searchedBookResult = searchedResult.filter((result) => !result.role)

    if (categoryName === CATEGORY_ALL.name) {
      getDetailPostList(searchByType(parseListTitle(searchedBookResult)))
      return
    } else {
      const channelId = allCategories.find((category) => category.name === categoryName).id
      const filteredResult = searchedBookResult.filter((result) => result.channel === channelId)
      getDetailPostList(searchByType(parseListTitle(filteredResult)))
    }
  }

  const searchByType = (searchedResult) => {
    switch (searchType) {
      case SEARCH_TYPE['ALL']:
        return searchedResult.filter(
          (post) =>
            post.title.bookTitle.includes(searchedKeyword) ||
            post.title.postContent.includes(searchedKeyword) ||
            post.title.postQuote.includes(searchedKeyword)
        )
      case SEARCH_TYPE['TITLE']:
        return searchedResult.filter((post) => post.title.bookTitle.includes(searchedKeyword))
      case SEARCH_TYPE['CONTENT']:
        return searchedResult.filter((post) => post.title.postContent.includes(searchedKeyword))
      case SEARCH_TYPE['QUOTE']:
        return searchedResult.filter((post) => post.title.postQuote.includes(searchedKeyword))
      default:
        return searchedResult
    }
  }

  return (
    <Fragment>
      <Header />
      <Banner />
      <MainPageSection>
        <MainPageNav
          navbarListStyle={{
            width: '89%',
            paddingBottom: '24px',
            borderBottom: '1px solid #d9d9d9',
          }}
          activeItemStyle={{ ...activeItemStyle }}
          items={allCategories}
          handleClick={(category) => {
            setCategoryName(category.name)
            setIsRerender(true)
          }}
          style={{ margin: '0 200px' }}
        />

        <SearchBar>
          <MainPageSelect
            data={Object.values(SEARCH_TYPE)}
            placeholder={'제목+내용'}
            onChange={(e) => {
              setSearchType(e.target.value)
            }}
          />
          <MainPageInput
            placeholder="포스트를 검색해주세요."
            block
            required
            onChange={onChangeSearchedKeyword}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setSearchedKeyword(e.target.value)
                onSearch()
              }
            }}
          ></MainPageInput>
          <MainPageButton onClick={onSearch}>
            <Icon name="search" color="white" size={24} />
          </MainPageButton>

          <MainPageButton ml="40px" onClick={handleClickNewPostButton}>
            <Icon name="feather" color="white" size={24} style={{ marginRight: '4px' }} />
            <span>새 글 작성</span>
          </MainPageButton>
        </SearchBar>

        <SliderWrapper>
          <BookListSlider
            style={{ width: '1200px', height: '620px' }}
            posts={postList}
            grid={{ fill: 'row', rows: 2 }}
            handleClick={handleClickPost}
          />
        </SliderWrapper>
      </MainPageSection>

      <Modal visible={showPostModal} onClose={closePostModal}>
        <Post
          post={post}
          onClose={closePostModal}
          handleRerenderPost={() => {
            setIsRerender(true)
          }}
        />
      </Modal>

      <Modal
        visible={showNewPostFormModal}
        onClose={() => {
          closeNewPostFormModal()
        }}
        closeOnClickOutside={false}
      >
        <NewPostForm showModal={showNewPostFormModal} onClose={closeNewPostFormModal} />
      </Modal>
      <Footer />
    </Fragment>
  )
}

export default MainPage
