import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import { Avatar } from '@components'

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

const UserInfo = ({ userInfo }) => {
  const [fullName, setFullName] = useState({
    fullName: '',
    quote: '',
  })

  useEffect(() => {
    if (userInfo) {
      setFullName(JSON.parse(userInfo['fullName']))
    }
  }, [userInfo])

  return (
    <UserInfoContainer>
      <Profile>
        <Avatar size={196} />
        <p className="user-name">{fullName.fullName}</p>
      </Profile>
      <UserContent>{fullName.quote}</UserContent>
    </UserInfoContainer>
  )
}

export default UserInfo
