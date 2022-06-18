import { Avatar } from '@components'

const tagMap = {
  li: 'li',
  div: 'div',
}

const UserBox = ({ children, image, tag = 'div', avatarSize, ...props }) => {
  const Tag = tagMap[tag] || 'div'
  const defaultStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  }

  return (
    <Tag style={{ ...defaultStyle, ...props.style }} {...props}>
      <Avatar size={avatarSize} src={image} />
      <div>{children}</div>
    </Tag>
  )
}

export default UserBox
