import { BookCard } from '@components'
import { useState } from 'react'
// TODO: 추후에 더미데이터 import

export default {
  title: 'Component/BookCard',
  component: BookCard,
  argTypes: {
    post: {},
  },
}

export const Default = () => {
  const [post, setpost] = useState(null)

  const handleOnClick = (post) => {
    console.log(post)
    setpost(post)
  }

  return (
    <>
      <BookCard post={null} handleOnClick={handleOnClick} />

      {post && (
        <div>
          <h1>title : {post.title.bookTitle}</h1>
          <h2>author : {post.author.fullName}</h2>
          <p>한 구절 : {post.title.postQuote}</p>
        </div>
      )}
    </>
  )
}
