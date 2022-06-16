import styled from '@emotion/styled'
import { Header, Banner, BookListSlider, Input, Button, Select } from '@components'
import { useState, useEffect } from 'react'
import { getChannelList, getPostListInChannel, getChannelInfo, getSearchedBookList } from '@apis'

const CATEGORY = {
  ALL: 'all',
  NOVEL: '소설',
  POET: '시',
}

const SEARCH_TYPE = {
  ALL: '전체 검색',
  TITLE: '책 제목',
  CONTENT: '내용',
  QUOTE: '구절',
}
const SearchBar = styled.div`
  display: flex;
  justify-content: center;
`

const sortByLatest = (post1, post2) => {
  return Date.parse(post2.createdAt) - Date.parse(post1.createdAt)
}

const parseListTitle = (postList) => {
  try {
    return postList.map((post) => {
      return {
        ...post,
        title: JSON.parse(post.title),
      }
    })
  } catch (e) {
    // TODO: 현재 api 데이터의 title이 JSON.stringify 형태가 아니기 때문에,
    // 오류가 발생하므로, try-catch 사용
    return postList
  }
}
const MainPage = () => {
  const [postList, setPostList] = useState([])
  const [categoryName, setCategoryName] = useState(CATEGORY['ALL'])
  const [searchedKeyword, setSearchedKeyword] = useState('')
  const [searchType, setSearchType] = useState(SEARCH_TYPE['ALL'])

  const getAllPost = async () => {
    const channelList = await getChannelList()
    const totalPostList = (
      await Promise.all(channelList.map(async (channel) => await getPostListInChannel(channel._id)))
    ).flat()

    totalPostList.sort(sortByLatest)
    setPostList(parseListTitle(totalPostList))
  }

  const getChannelPost = async (channelName) => {
    const channelInfo = await getChannelInfo(channelName)
    const channelPostList = await getPostListInChannel(channelInfo._id)
    setPostList(parseListTitle(channelPostList))
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
      setPostList(parseListTitle(searchedBookResult).sort(sortByLatest))
      return
    } else {
      const { _id } = await getChannelInfo(categoryName)
      const filteredResult = searchedBookResult.filter((result) => result.channel === _id)
      setPostList(parseListTitle(filteredResult))
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
    <div>
      <Header />
      <Banner />
      <SearchBar>
        <Select
          data={Object.values(SEARCH_TYPE)}
          placeholder={'검색 옵션 지정'}
          onChange={(e) => {
            setSearchType(e.target.value)
          }}
        />
        <Select
          data={Object.values(CATEGORY)}
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
