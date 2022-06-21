import styled from '@emotion/styled'
import { Text, Icon } from '@components'
import PropTypes from 'prop-types'
import LUVOOOK_LOGO from '@images/luvook_default.png'
import WoodLight from '@images/WoodLight.jpg'

const CardContainer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-top: 10px;
`

const Card = styled.div`
  position: relative;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 220px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${(post) => post.image || LUVOOOK_LOGO});
  text-align: center;
  color: white;
  cursor: pointer;
  box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12),
    0 5px 5px -3px rgba(0, 0, 0, 0.2);
  background-size: cover;
  background-repeat: no-repeat;
  padding: 10px;
  box-sizing: border-box;

  &:hover {
    transition-duration: 0.5s;
    transform: translateY(-5px);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }
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
  width: 200px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  padding: 5px 10px;
  text-decoration: none;
  font-weight: bold;
  background-size: cover;
  color: white;
  border: 1px solid #dedede;
  background-image: url(${WoodLight});
  filter: darken(85%);
  box-shadow: 0 3px 12px alpha(black, 0.2);
  text-align: center;
  border-radius: 5px;
`

const BookCard = ({ post, handleOnClick }) => {
  return (
    <CardContainer>
      <Card
        image={post.title.bookImage || LUVOOOK_LOGO}
        onClick={() => {
          handleOnClick(post)
        }}
      >
        <BookmarkContainer>
          <LikeBookmark name="bookmark" color="yellow" size={18} />
          <Text block>{post.likes.length}</Text>
        </BookmarkContainer>
        {post.title.postQuote.length > 40
          ? post.title.postQuote.substr(0, 40) + '...'
          : post.title.postQuote}
      </Card>

      <NamePlate>
        {post.title.bookTitle.length > 12
          ? post.title.bookTitle.substr(0, 12) + '...'
          : post.title.bookTitle}
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
