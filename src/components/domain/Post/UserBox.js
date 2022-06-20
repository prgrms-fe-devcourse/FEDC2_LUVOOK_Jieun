import { Link } from 'react-router-dom'
import { Avatar } from '@components'

const tagMap = {
  li: 'li',
  div: 'div',
}

const UserBox = ({ children, userId, image, tag = 'div', avatarSize, ...props }) => {
  const Tag = tagMap[tag] || 'div'
  const defaultStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  }

  return (
    <Tag style={{ ...defaultStyle, ...props.style }} {...props}>
      <Link to={`/users/${userId}`}>
        <Avatar size={avatarSize} src={image} />
      </Link>
      <div>{children}</div>
    </Tag>
  )
}

export default UserBox
