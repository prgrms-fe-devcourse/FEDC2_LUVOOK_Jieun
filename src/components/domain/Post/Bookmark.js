import styled from '@emotion/styled'
import BookmarkAfter from '@images/Bookmark_after.png'
import BookmarkDefault from '@images/Bookmark_default.png'

const DefaultBookmark = styled.button`
  position: absolute;
  width: 105px;
  height: 136px;
  border: none;
  top: -30px;
  right: 40px;
  z-index: 9999999;
  background-color: transparent;
  background-image: url(${BookmarkDefault});
  cursor: pointer;
`

const ActiveBookmark = styled(DefaultBookmark)`
  background-color: transparent;
  background-image: url(${BookmarkAfter});
`

const Bookmark = ({ active, handleClick }) => {
  return active ? (
    <ActiveBookmark onClick={handleClick} />
  ) : (
    <DefaultBookmark onClick={handleClick}>
      클릭해서
      <br />
      북마크 하기
    </DefaultBookmark>
  )
}

export default Bookmark
