import { Text } from '@components'
import { formatTime } from './index'
import UserBox from './UserBox'

const Comment = ({ author, comment, createdAt }) => {
  const { image, fullName } = author

  return (
    <UserBox tag="li" image={image} avatarSize={40}>
      <Text block>
        {fullName} {formatTime(createdAt)}
      </Text>
      <Text block>{comment}</Text>
    </UserBox>
  )
}

export default Comment
