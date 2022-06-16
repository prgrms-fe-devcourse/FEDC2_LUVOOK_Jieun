import styled from '@emotion/styled'
import { Header, Banner, BookListSlider, Input, Button, Select, Modal, Post } from '@components'
import { useState, useEffect } from 'react'
import { getChannelList, getPostListInChannel, getChannelInfo, getSearchedBookList } from '@apis'

const ALL_CATEGORY = 'all'
const DEFAULT_CATEGORY = '소설'

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
`

const MainPage = () => {
  const [postList, setPostList] = useState([])
  const [categoryName, setCategoryName] = useState(ALL_CATEGORY)
  const [searchedKeyword, setSearchedKeyword] = useState('')
  const [showPostModal, setShowPostModal] = useState(false)
  const [post, setPost] = useState(null)

  const closePostModal = () => {
    setShowPostModal(false)
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
    </div>
  )
}

export default MainPage
