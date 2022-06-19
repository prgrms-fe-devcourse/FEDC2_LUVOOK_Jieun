import { Fragment } from 'react'
import styled from '@emotion/styled'
import { Text, Button } from '@components'
import { formatTime } from './index'
import UserBox from './UserBox'

const AuthorizedButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex: 0;
  height: 60px;

  Button {
    border-radius: 30px;
    height: 30px;
    background-color: transparent;
    border: 2px solid #3f51b5;
    color: #3f51b5;
    margin-left: 8px;
  }
`

const PostHeader = ({ author, createdAt }) => {
  // TODO
  // AuthorizedButtons 컴포넌트는 게시물작성자와 접속한 유저가 동일할 때만 보여줘야한다.
  const { image, fullName } = author

  return (
    <Fragment>
      <UserBox image={image}>
        <Text block>{fullName}</Text>
        <Text block>{formatTime(createdAt)}</Text>
      </UserBox>
      <AuthorizedButtons>
        <Button>수정</Button>
        <Button>삭제</Button>
      </AuthorizedButtons>
    </Fragment>
  )
}

export default PostHeader
