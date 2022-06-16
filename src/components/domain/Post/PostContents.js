import { Fragment } from 'react'
import { Text, Title, Image } from '@components'

const defaultTitleProps = {
  bookTitle: '',
  postContent: '',
  postQuote: '',
}

const PostContents = ({ title, image }) => {
  // TODO
  // title 파싱 로직이 완성되면 이 if문은 삭제해주세요.
  if (typeof title === 'string') {
    title = {
      bookTitle: '타이틀',
      postContent: '파싱이',
      postQuote: '완료되지 않음',
    }
  }

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
