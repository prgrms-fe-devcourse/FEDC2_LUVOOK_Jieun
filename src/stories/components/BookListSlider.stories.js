import { BookListSlider } from '@components'

const DUMMY_USER = {
  image: 'https://source.unsplash.com/random',
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

const posts = Array.from({ length: 30 }).map((_, index) => ({
  likes: Array.from({ length: index }),
  comments: Array.from({ length: index }),
  _id: `post_id${index + 1}`,
  image: `https://picsum.photos/200?${index + 1}`,
  // "imagePublicId": Optional<String>,
  title: {
    bookTitle: `${index + 1}제목`,
    postContent: `${index + 1}내용`,
    postQuote: `${index + 1}문구`,
  },
  channel: DUMMY_CHANNEL,
  author: DUMMY_USER,
  createdAt: `2020-01-${index}`,
  updatedAt: `2020-01-${index}`,
}))

export default {
  title: 'Component/BookListSlider',
  component: BookListSlider,
  argTypes: {
    posts: { defaultValue: posts },
  },
}

const handleOnClick = (post) => {
  console.log(post)
}
export const Default = (args) => {
  return <BookListSlider posts={posts} handleClick={handleOnClick} />
}

export const MultiRows = (args) => {
  return (
    <BookListSlider
      posts={posts}
      slidesPerView={4}
      grid={{ fill: 'row', rows: 2 }}
      handleClick={handleOnClick}
    />
  )
}
