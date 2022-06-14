import { Avatar } from '@components'

const DEFAULT_IMAGE_URL = 'https://source.unsplash.com/random'

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
      <Avatar size={avatarSize} src={image || DEFAULT_IMAGE_URL} />
      <div>{children}</div>
    </Tag>
  )
}

export default UserBox
