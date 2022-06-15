import styled from '@emotion/styled'
import { Header, Banner } from '@components'
import { useState, useEffect } from 'react'
import { getChannelList, getPostListInChannel, getChannelInfo, getSearchedBookList } from '@apis'
import { BookListSlider, Input, Button, Select } from '@components'

const ALL_CATEGORY = 'all'
const DEFAULT_CATEGORY = '소설'

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
`

const MainPage = () => {
  const [postList, setPostList] = useState([])
  const [categoryName, setCategoryName] = useState(ALL_CATEGORY)

  const [searchKeyword, setSearchKeyword] = useState('')

  const fetchAllPost = async () => {
    const channelList = await getChannelList()
    const totalPostList = await Promise.all(
      channelList.map(async (channel) => await getPostListInChannel(channel._id))
    ).then((res) => res.flat())

    totalPostList.sort((post1, post2) => {
      return Date.parse(post2.createdAt) - Date.parse(post1.createdAt)
    })

    setPostList(totalPostList)
  }

  const fetchChannelPost = async (channelName) => {
    const channelInfo = await getChannelInfo(channelName)
    const channelPostList = await getPostListInChannel(channelInfo._id)
    setPostList(channelPostList)
  }

  // TODO: 상세 포스트 모달 띄우는 로직
  const handleOnClick = (post) => {
    console.log(post)
  }

  useEffect(() => {
    switch (categoryName) {
      case ALL_CATEGORY:
        fetchAllPost()
        break
      case DEFAULT_CATEGORY:
        fetchChannelPost(DEFAULT_CATEGORY)
        break
      default:
        setPostList([])
    }
  }, [categoryName])

  useEffect(() => {
    fetchAllPost()
  }, [])

  const onChangeSearchKeyword = (e) => {
    setSearchKeyword(e.target.value)
  }

  const onSearch = async (e) => {
    if (!searchKeyword) return
    const searchResult = await getSearchedBookList(searchKeyword)
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
          onChange={onChangeSearchKeyword}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              setSearchKeyword(e.target.value)
              onSearch()
            }
          }}
        />
        <Button onClick={onSearch}>검색</Button>
      </SearchBar>

      <BookListSlider
        posts={postList}
        grid={{ fill: 'row', rows: 2 }}
        handleClick={handleOnClick}
      />
    </div>
  )
}

export default MainPage
