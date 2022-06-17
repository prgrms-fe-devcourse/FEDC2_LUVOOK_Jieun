import { Fragment } from 'react'
import { Text, Title, Image } from '@components'

const defaultTitleProps = {
  bookTitle: '',
  postContent: '',
  postQuote: '',
}

const PostContents = ({ title, image }) => {
  const { bookTitle, postContent, postQuote } = { ...defaultTitleProps, ...title }

  return (
    <Fragment>
      <Title style={{ margin: '0 auto', textAlign: 'center' }}>{postQuote}</Title>
      <Image block src={image} width="200px" height="300px" style={{ margin: '0 auto' }} />
      <Title level={3} style={{ margin: '0 auto', textAlign: 'center' }}>
        {bookTitle}
      </Title>
      <Text>{postContent}</Text>
    </Fragment>
  )
}
export default PostContents
