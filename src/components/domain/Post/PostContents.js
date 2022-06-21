import { Fragment } from 'react'
import { Text, Title, Image } from '@components'
import LUVOOOK_LOGO from '@images/luvook_default.png'

const defaultTitleProps = {
  bookTitle: '',
  postContent: '',
  postQuote: '',
  bookImage: LUVOOOK_LOGO,
}

const titleStyle = { margin: '16px auto', textAlign: 'center' }

const imageStyle = {
  margin: '16px auto',
  borderRadius: '2px',
  boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
}

const PostContents = ({ titleObj }) => {
  const { bookTitle, bookImage, postQuote, postContent } = { ...defaultTitleProps, ...titleObj }

  return (
    <Fragment>
      <Title level={2} style={titleStyle}>
        {postQuote}
      </Title>
      <Image block src={bookImage} width="200px" height="300px" style={imageStyle} />
      <Title level={4} style={titleStyle}>
        {bookTitle}
      </Title>
      <Text>{postContent}</Text>
    </Fragment>
  )
}
export default PostContents
