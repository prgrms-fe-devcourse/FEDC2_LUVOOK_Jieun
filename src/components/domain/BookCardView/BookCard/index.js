import styled from '@emotion/styled'
import { Text, Icon } from '@components'
import PropTypes from 'prop-types'

// TODO: Image 컴포넌트와 동일한 상수, 후에 분리
const PLACEHOLDER_SRC = 'https://via.placeholder.com/200?text=LUVOOK'

const CardContainer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

const Card = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 167px;
  height: 200px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${(post) => post.image || PLACEHOLDER_SRC});
  text-align: center;
  color: white;
  cursor: pointer;
`

const BookmarkContainer = styled.div`
  width: 37px;
  height: 18px;
  position: absolute;
  top: 0;
  right: 8px;
  display: flex;
  align-items: center;
`

const LikeBookmark = styled(Icon)`
  margin-right: 5px;
`

const NamePlate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin-top: 10px;
  padding: 5px;
`

const BookCard = ({ post, handleOnClick }) => {
  return (
    <CardContainer>
      <Card
        image={post.image}
        onClick={() => {
          handleOnClick(post)
        }}
      >
        <BookmarkContainer>
          <LikeBookmark name="bookmark" color="yellow" size={18} />
          <Text block>{post.likes.length}</Text>
        </BookmarkContainer>
        {/*  TODO: 이 부분은 글쓰기 기능 구현 후 다시 구현 필요 */}
        <Text>{post.title.postQuote || post.title} </Text>
      </Card>

      <NamePlate>
        <Text>{post.title.bookTitle || post.title}</Text>
      </NamePlate>
    </CardContainer>
  )
}

BookCard.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string,
    title: PropTypes.oneOfType([
      PropTypes.shape({
        bookTitle: PropTypes.string,
        postQuote: PropTypes.string,
      }),
      PropTypes.string,
    ]),
  }),
  handleOnClick: PropTypes.func,
}

export default BookCard
