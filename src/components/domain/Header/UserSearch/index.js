import { useState, Fragment } from 'react'
import styled from '@emotion/styled'
import { getSearchedUserList } from '@apis'
import { Input, Icon, Avatar } from '@components'
import { Link } from 'react-router-dom'
import { useClickAway } from '@hooks'
import ProfileImage from '@images/profile_default.png'

const UserSearchContainer = styled.div`
  width: 480px;
  height: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .user-result-container {
    width: 60%;
    height: 420px;
    overflow-y: scroll;
  }
  .user-result-container::-webkit-scrollbar {
    width: 5px;
  }
  .user-result-container::-webkit-scrollbar-thumb {
    height: 30%;
    background: #d9d9d9;
    border-radius: 5px;
  }
`

const UserSearchInput = styled.div`
  width: 60%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
`

const UserSearchResult = styled.div`
  .another-user {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: black;
    font-weight: bold;
    padding: 8px 10px;
    overflow-x: hidden;
    .user-avatar {
      width: 40px;
      height: 40px;
    }
    .user-name {
      margin-left: 4%;
    }
  }
`

const UserSearch = (onClose, closeOnClick) => {
  const [searchedUserList, setSearchedUserList] = useState([])

  const onClickModalWrapper = useClickAway(() => {
    closeOnClick && onClose && onClose()
  })

  const parseUserFullName = (searchedUserList) => {
    try {
      return searchedUserList.map((user) => {
        return {
          id: user._id,
          fullName: JSON.parse(user.fullName).fullName,
        }
      })
    } catch (e) {
      return searchedUserList
    }
  }

  const updateChange = async (e) => {
    const userName = e.target.value
    if (!userName) {
      setSearchedUserList([])
      return
    }

    if (userName.length > 0) {
      const userList = await getSearchedUserList(userName)
      const result = parseUserFullName(userList).filter((user) => user.fullName.includes(userName))

      setSearchedUserList(result)
    }
  }

  return (
    <UserSearchContainer>
      <UserSearchInput>
        <Icon name={'search'} size={20} />
        <Input
          placeholder="찾으시는 사용자가 있나요?"
          style={{
            width: '100%',
            height: '40px',
            maxWidth: '800px',
            background: '#F6F6F6',
            border: 'none',
            outline: 'none',
          }}
          onChange={updateChange}
        ></Input>
      </UserSearchInput>
      <div className="user-result-container">
        {searchedUserList?.map((user) => {
          return (
            <Fragment key={user.id}>
              <UserSearchResult onClick={onClickModalWrapper}>
                <Link to={`/users/${user.id}`} className="another-user">
                  <Avatar src={ProfileImage} size={40} className="user-avatar" />
                  <p className="user-name">{user.fullName}</p>
                </Link>
              </UserSearchResult>
            </Fragment>
          )
        })}
      </div>
    </UserSearchContainer>
  )
}

export default UserSearch
