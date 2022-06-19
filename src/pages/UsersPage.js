import { useState } from 'react'
import { Header, Avatar, UserEditForm } from '@components'
import styled from '@emotion/styled'
import { useUserContext } from '@contexts/UserContext'

const UserPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const UserInfoContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 89%;
  height: 34vh;
  max-width: 1280px;
  margin-top: 40px;
`
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  width: 22%;
  .user-name {
    position: relative;
    bottom: 50px;
  }
`

const UserContent = styled.div`
  display: flex;
  width: 60%;
  height: 156px;
  background-color: #ffeadb;
  font-size: 24px;
  margin-top: 10px;
  padding: 20px 20px 0 20px;
  color: #637373;
  white-space: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;

  > textarea {
    width: 100%;
    height: 17vh;
    background-color: transparent;
    border: none;
    text-align: left;
    vertical-align: top;
    white-space: normal;
    font-size: 24px;
  }
  > textarea:focus {
    outline: none;
  }
`

const UsersPage = () => {
  const [isUser, setIsUser] = useState(false)
  const { currentUserState } = useUserContext()
  const { fullName, quote } = currentUserState.currentUser

  return (
    <UserPageContainer>
      <Header />
      {!isUser ? (
        <UserEditForm />
      ) : (
        <UserInfoContainer>
          <Profile>
            <Avatar src={'https://picsum.photos/200'} size={196} />
            <p className="user-name">{fullName}</p>
          </Profile>
          <UserContent>{quote}</UserContent>
        </UserInfoContainer>
      )}
    </UserPageContainer>
  )
}

export default UsersPage
