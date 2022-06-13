import { BookCard } from '@components'
import { useState } from 'react'

export default {
  title: 'Component/BookCard',
  component: BookCard,
  argTypes: {
    post: {},
  },
}

const DUMMY_IMAGE = 'https://source.unsplash.com/random'

const DUMMY_USER = {
  image: DUMMY_IMAGE,
  role: { quote: '다람쥐 헌 쳇바퀴에 타고파' },
  posts: [],
  likes: [],
  comments: [],
  notifications: [],
  _id: '1',
  fullName: '가나다랍',
  email: '123@aaa.com',
  createdAt: '2020-01-01',
  updatedAt: '2020-01-01',
}

const DUMMY_CHANNEL = {
  // "authRequired": false, // 사용되지 않음
  posts: [],
  _id: 'chId_1',
  name: 'ch_1',
  description: 'ch_1에 대한 설명',
  createdAt: '2020-01-01',
  updatedAt: '2020-01-01',
}

const DUMMY_POST = {
  likes: [
    {
      _id: 'like_id1',
      user: 'aa',
      post: 'post_id',
      createdAt: '2020-01-01',
      updatedAt: '2020-01-01',
    },
    {
      _id: 'like_id2',
      user: 'bb',
      post: 'post_id',
      createdAt: '2020-01-02',
      updatedAt: '2020-01-02',
    },
    {
      _id: 'like_id3',
      user: 'cc',
      post: 'post_id',
      createdAt: '2020-01-03',
      updatedAt: '2020-01-03',
    },
  ],
  comments: [
    {
      _id: 'comment_id1',
      comment: 'comment1',
      author: { ...DUMMY_USER, _id: '2' }, // 유저 정보 객체
      post: 'post_id', // 포스트 id
      createdAt: '2020-01-01',
      updatedAt: '2020-01-01',
    },
    {
      _id: 'comment_id1',
      comment: 'comment1',
      author: { ...DUMMY_USER, _id: '3' }, // 유저 정보 객체
      post: 'post_id', // 포스트 id
      createdAt: '2020-01-01',
      updatedAt: '2020-01-01',
    },
  ],
  _id: 'post_id',
  image: DUMMY_IMAGE,
  // "imagePublicId": Optional<String>,
  title: {
    bookTitle: '모던 자바스크립트 DeepDive',
    postContent: '너무 길어요',
    postQuote:
      '결국 프로그래밍은 요구사항의 집합을 분석해서 적절한 자료구조와 함수의 집합으로 변환한 후, 그 흐름을 제어하는 것이다.',
  },
  channel: DUMMY_CHANNEL,
  author: DUMMY_USER,
  createdAt: '2019-12-31',
  updatedAt: '2019-12-31',
}

export const Default = () => {
  const [data, setData] = useState(null)

  const handleOnClick = (post) => {
    console.log(post)
    setData(post)
  }

  return (
    <>
      <BookCard post={DUMMY_POST} handleOnClick={handleOnClick} />

      {data && (
        <div>
          <h1>title : {data.title.bookTitle}</h1>
          <h2>author : {data.author.fullName}</h2>
          <p>한 구절 : {data.title.postQuote}</p>
        </div>
      )}
    </>
  )
}
