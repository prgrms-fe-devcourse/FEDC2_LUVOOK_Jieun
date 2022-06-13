import { ListSlider } from '@components'

const posts = Array.from({ length: 30 }).map((_, index) => ({
  _id: `post_id${index + 1}`,
  image: `https://picsum.photos/200?${index + 1}`,
  title: {
    bookTitle: `${index + 1}제목`,
    postContent: `${index + 1}내용`,
    postQuote: `${index + 1}문구`,
  },
}))

export default {
  title: 'Component/ListSlider',
  component: ListSlider,
  argTypes: {
    posts: { defaultValue: posts },
  },
}

const handleOnClick = (post) => {
  console.log(post)
}
export const Default = (args) => {
  return <ListSlider posts={posts} handleOnClick={handleOnClick} />
}

export const MultiRows = (args) => {
  return (
    <ListSlider
      posts={posts}
      slidesPerView={4}
      grid={{ fill: 'row', rows: 2 }}
      handleOnClick={handleOnClick}
    />
  )
}
