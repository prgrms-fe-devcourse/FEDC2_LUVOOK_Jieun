import styled from '@emotion/styled'
import { Text, Icon } from '@components'
import PropTypes from 'prop-types'
import LUVOOOK_LOGO from '@images/luvook_default.png'

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
    url(${(post) => post.image || LUVOOOK_LOGO});
  text-align: center;
  color: white;
  cursor: pointer;
  // TODO: constant에 선언된 회색으로 변경
  box-shadow: 0 0 1rem rgba(33, 33, 33, 0.5);
  background-size: cover;
  background-repeat: no-repeat;
  padding: 10px;
  box-sizing: border-box;
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
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  padding: 5px 10px;
  text-decoration: none;
  font-weight: bold;
  /* text-shadow: 1px 1px 0 #ffffff;
  box-shadow: 2px 2px 0.5em rgba(122, 122, 122, 0.55), inset 1px 1px 0 rgba(255, 255, 255, 0.9),
    inset -1px -1px 0 rgba(0, 0, 0, 0.34);
  border: 1px solid #dedede;
  background: linear-gradient(
    -72deg,
    #dedede,
    #ffffff 16%,
    #dedede 21%,
    #ffffff 24%,
    #dedede 36%,
    #ffffff 45%,
    #ffffff 60%,
    #dedede 72%,
    #ffffff 80%,
    #dedede 84%,
    #a1a1a1
  );
  border-radius: 5px; */
  // background: rgba(234, 220, 199);
  // background-image: url(https://st3.depositphotos.com/5273971/i/600/depositphotos_347264798-stock-photo-vitage-paper-texture-old-brown.jpg);

  background-color: white;
  border: 1px solid #dedede;
  box-shadow: 0 3px 12px alpha(black, 0.2);
  // filter: saturate(70%) contrast(85%);

  text-align: center;
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
