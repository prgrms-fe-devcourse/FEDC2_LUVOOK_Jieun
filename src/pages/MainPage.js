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
} from '@components'
import { useState, useEffect } from 'react'
import { getChannelList, getPostListInChannel, getChannelInfo, getSearchedBookList } from '@apis'

const ALL_CATEGORY = 'all'
const DEFAULT_CATEGORY = '소설'

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
`

// type FormData = {
//   title: String,
//   image: Binary | null,
//   channelId: String
// }

const PLACEHOLDER_IMAGE_SRC = 'https://via.placeholder.com/200?text=LUVOOK'
const DEFAULT_CHANNEL_ID = '소설'

const initialFormData = {
  title: '',
  image: PLACEHOLDER_IMAGE_SRC,
  channelId: DEFAULT_CHANNEL_ID,
}

const MainPage = () => {
  const [postList, setPostList] = useState([])
  const [categoryName, setCategoryName] = useState(ALL_CATEGORY)
  const [searchedKeyword, setSearchedKeyword] = useState('')
  const [showPostModal, setShowPostModal] = useState(false)
  const [post, setPost] = useState(null)
  const [showNewPostFormModal, setShowNewPostFormModal] = useState(false)
  const [formData, setFormData] = useState({ ...initialFormData })

  const closePostModal = () => {
    setShowPostModal(false)
    setPost(null)
  }

  const openNewPostFormModal = () => setShowNewPostFormModal(true)

  const closeNewPostFormModal = () => {
    if (window.confirm('작성중인 글이 저장되지 않습니다. 글 작성을 취소할까요?')) {
      setShowNewPostFormModal(false)
      setFormData({ ...initialFormData })
    }
  }

  const getAllPost = async () => {
    const channelList = await getChannelList()

    const totalPostList = (
      await Promise.all(channelList.map(async (channel) => await getPostListInChannel(channel._id)))
    ).flat()

    totalPostList.sort((post1, post2) => {
      return Date.parse(post2.createdAt) - Date.parse(post1.createdAt)
    })

    setPostList(totalPostList)
  }

  const getChannelPost = async (channelName) => {
    const channelInfo = await getChannelInfo(channelName)
    const channelPostList = await getPostListInChannel(channelInfo._id)
    setPostList(channelPostList)
  }

  const handleClickPost = (post) => {
    setPost(post)
    setShowPostModal(true)
  }

  useEffect(() => {
    switch (categoryName) {
      case ALL_CATEGORY:
        getAllPost()
        break
      case DEFAULT_CATEGORY:
        getChannelPost(DEFAULT_CATEGORY)
        break
      default:
        setPostList([])
    }
  }, [categoryName])

  useEffect(() => {
    getAllPost()
  }, [])

  const onChangeSearchedKeyword = (e) => {
    setSearchedKeyword(e.target.value)
  }

  const onSearch = async (e) => {
    if (!searchedKeyword) return
    const searchResult = await getSearchedBookList(searchedKeyword)
    const searchBookResult = searchResult.filter((result) => !result.role)
    setPostList(searchBookResult)
    setCategoryName(ALL_CATEGORY)
  }

  return (
    <div>
      <Header />
      <Banner />

      <Button onClick={openNewPostFormModal}>새로운 글 작성하기</Button>

      <SearchBar>
        <Select data={[]} />
        <Input
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
        />
        <Button onClick={onSearch}>검색</Button>
      </SearchBar>

      <BookListSlider
        posts={postList}
        grid={{ fill: 'row', rows: 2 }}
        handleClick={handleClickPost}
      />

      <Modal visible={showPostModal} onClose={closePostModal}>
        <Post post={post} />
      </Modal>

      <Modal
        visible={showNewPostFormModal}
        onClose={closeNewPostFormModal}
        closeOnClickOutside={false}
      >
        <NewPostForm data={formData} />
      </Modal>
    </div>
  )
}

export default MainPage
