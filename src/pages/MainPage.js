import styled from '@emotion/styled'
import { Header, Banner, BookListSlider, Input, Button, Select } from '@components'
import { useState, useEffect } from 'react'
import { getChannelList, getPostListInChannel, getChannelInfo, getSearchedBookList } from '@apis'

const CATEGORY = {
  ALL: 'all',
  NOVEL: '소설',
  POET: '시',
}

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
`

const MainPage = () => {
  const [postList, setPostList] = useState([])
  const [categoryName, setCategoryName] = useState(CATEGORY['ALL'])
  const [searchedKeyword, setSearchedKeyword] = useState('')

  const getAllPost = async () => {
    const channelList = await getChannelList()

    const totalPostList = (
      await Promise.all(channelList.map(async (channel) => await getPostListInChannel(channel._id)))
    ).flat()

    totalPostList.sort((post1, post2) => {
      return Date.parse(post2.createdAt) - Date.parse(post1.createdAt)
    })

    setPostList(totalPostList)
    // console.log(totalPostList)
  }

  const getChannelPost = async (channelName) => {
    const channelInfo = await getChannelInfo(channelName)
    const channelPostList = await getPostListInChannel(channelInfo._id)
    setPostList(channelPostList)
  }

  // TODO: 상세 포스트 모달 띄우는 로직
  const handleClickPost = (post) => {
    console.log(post)
  }

  useEffect(() => {
    switch (categoryName) {
      case CATEGORY['ALL']:
        getAllPost()
        break
      case CATEGORY['NOVEL']:
        getChannelPost(CATEGORY['NOVEL'])
        break
      case CATEGORY['POET']:
        getChannelPost(CATEGORY['POET'])
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
    const searchedResult = await getSearchedBookList(searchedKeyword)
    const searchedBookResult = searchedResult.filter((result) => !result.role)

    if (categoryName === CATEGORY['ALL']) {
      setPostList(searchedBookResult)
      return
    } else {
      const { _id } = await getChannelInfo(categoryName)
      setPostList(searchedBookResult.filter((result) => result.channel === _id))
    }
  }

  return (
    <div>
      <Header />
      <Banner />
      <SearchBar>
        <Select
          data={Object.values(CATEGORY)}
          categories={CATEGORY}
          onChange={(e) => {
            setCategoryName(e.target.value)
          }}
        />
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
    </div>
  )
}

export default MainPage
