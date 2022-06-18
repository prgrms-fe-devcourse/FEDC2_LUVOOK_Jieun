import { useState, useEffect, Fragment } from 'react'
import { Header, Avatar, Icon } from '@components'
import styled from '@emotion/styled'
import { getUserInfo, updateUserProfileImg, updateUserName, updateUserPassword } from '@apis'

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

const ProfileEdit = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  width: 22%;
  .user-name {
    border: solid 1px black;
    position: relative;
    bottom: 50px;
  }
  > input {
    width: 50%;
    height: 3vh;
    position: relative;
    bottom: 72px;
    font-size: 24px;
    background-color: #f3f3f3;
    text-align: center;
    border: solid 1px gray;
    border-radius: 7px;
  }
`

const UserContent = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  height: 19vh;
  padding: 0 20px;
  background-color: #ffeadb;
  font-size: 24px;
  margin-top: 10px;
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

const UserEditButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  color: #a5a3af;
  cursor: pointer;
  position: relative;
  bottom: 120px;
  left: 490px;
`

const dummy = {
  id: '1',
  fullName: {
    fullName: '김태욱',
    quote:
      '나는 피아노 앞에서 실제 노래를 부르는 것보다 머릿속으로 음악연습을 더 많이 한다. 가수라면 음악을 볼 수 있어야 하기 때문이다.',
  },
}

const UserEdit = () => {
  const [user, setUser] = useState(dummy)
  const [isNameEdit, setIsNameEdit] = useState(dummy.fullName.fullName)
  const [isQuoteEdit, setIsQuoteEdit] = useState(dummy.fullName.quote)

  const handleNameChange = (e) => {
    setIsNameEdit(e.target.value)
  }
  const handleQuoteChange = (e) => {
    setIsQuoteEdit(e.target.value)
  }

  return (
    <UserInfoContainer key={user.id}>
      <ProfileEdit>
        <Avatar src={'https://picsum.photos/200'} size={196} />
        <input type="text" value={isNameEdit} onChange={handleNameChange} maxlength="12" />
      </ProfileEdit>
      <UserContent>
        <textarea
          type="textarea"
          value={isQuoteEdit}
          onChange={handleQuoteChange}
          autoFocus
          maxlength="300"
        />
      </UserContent>
    </UserInfoContainer>
  )
}

const UsersPage = () => {
  const [user, setUser] = useState(dummy)
  const [isUser, setIsUser] = useState(false)
  const clickedToggle = () => {
    setIsUser((isUser) => !isUser)
  }
  const handleChange = (e) => {
    setIsUser(e.target.value)
  }

  return (
    <UserPageContainer>
      <Header />
      {isUser ? (
        <UserEdit />
      ) : (
        <UserInfoContainer key={user.id}>
          <Profile>
            <Avatar src={'https://picsum.photos/200'} size={196} />
            <p className="user-name">{user.fullName.fullName}</p>
          </Profile>
          <UserContent>
            <p>{user.fullName.quote}</p>
          </UserContent>
        </UserInfoContainer>
      )}
      <UserEditButton onClick={clickedToggle} onChange={handleChange}>
        {!isUser ? <Icon name={'tool'} size={20} rotate={'270'} /> : ''}
        {!isUser ? '회원 정보 수정' : '완료'}
      </UserEditButton>
    </UserPageContainer>
  )
}

export default UsersPage
