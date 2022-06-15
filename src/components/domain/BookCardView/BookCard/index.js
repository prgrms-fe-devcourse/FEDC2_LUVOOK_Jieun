import styled from '@emotion/styled'
import { Text, Icon } from '@components'
import PropTypes from 'prop-types'

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
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${(post) => post.image});
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

        <Text>{post.title.postQuote}</Text>
      </Card>

      <NamePlate>
        <Text>{post.title.bookTitle}</Text>
      </NamePlate>
    </CardContainer>
  )
}

BookCard.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.shape({
      bookTitle: PropTypes.string.isRequired,
      postQuote: PropTypes.string.isRequired,
    }),
  }),
  handleOnClick: PropTypes.func,
}

export default BookCard
