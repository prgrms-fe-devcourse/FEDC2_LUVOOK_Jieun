import { Header, Banner } from '@components'
import { useState, useEffect } from 'react'
import { getChannelList, getPostListInChannel, getChannelInfo } from '@apis'
import { BookListSlider } from '@components'

const ALL_CATEGORY = 'all'
const DEFAULT_CATEGORY = '소설'

const MainPage = () => {
  const [postList, setPostList] = useState([])
  const [categoryName, setCategoryName] = useState(ALL_CATEGORY)

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

  return (
    <div>
      <Header />
      <Banner />
      <BookListSlider
        posts={postList}
        grid={{ fill: 'row', rows: 2 }}
        handleClick={handleOnClick}
      />
    </div>
  )
}

export default MainPage
