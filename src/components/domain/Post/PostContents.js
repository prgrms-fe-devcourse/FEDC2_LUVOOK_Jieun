import { Fragment } from 'react'
import { Text, Title, Image } from '@components'
import LUVOOOK_LOGO from '@images/luvook_default.png'

const defaultTitleProps = {
  bookTitle: '',
  postContent: '',
  postQuote: '',
  bookImage: LUVOOOK_LOGO,
}

const PostContents = ({ titleObj }) => {
  const { bookTitle, bookImage, postQuote, postContent } = { ...defaultTitleProps, ...titleObj }

  return (
    <Fragment>
      <Title style={{ margin: '0 auto', textAlign: 'center' }}>{postQuote}</Title>
      <Image block src={bookImage} width="200px" height="300px" style={{ margin: '0 auto' }} />
      <Title level={3} style={{ margin: '0 auto', textAlign: 'center' }}>
        {bookTitle}
      </Title>
      <Text>{postContent}</Text>
    </Fragment>
  )
}
export default PostContents
