import { Text, Title, Image } from '@components'

const defaultImageUrl = 'https://source.unsplash.com/random'

// TODO
// '내용'에 title을 파싱해서 넣어야 한다.

const PostContents = ({ title, image }) => {
  return (
    <>
      <Title style={{ margin: '0 auto', textAlign: 'center' }}>{title}</Title>
      <Image
        block
        src={image || defaultImageUrl}
        width="200px"
        height="300px"
        style={{ margin: '0 auto' }}
      />
      <Text>내용</Text>
    </>
  )
}
export default PostContents
