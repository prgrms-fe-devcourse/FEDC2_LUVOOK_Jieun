import styled from '@emotion/styled'
import BookmarkAfter from '@images/Bookmark_after.png'
import BookmarkDefault from '@images/Bookmark_default.png'
import { Icon } from '@components'

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
  .bookmark-icon {
    position: relative;
    left: 40px;
    top: 55px;
  }
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
      <Icon className="bookmark-icon" name={'mouse-pointer'} size={40} />
    </DefaultBookmark>
  )
}

export default Bookmark
