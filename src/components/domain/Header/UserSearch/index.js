import { useState, useEffect, Fragment } from 'react'
import styled from '@emotion/styled'
import { getSearchedUserList } from '@apis'
import { Input, Icon, Avatar } from '@components'
import { Link } from 'react-router-dom'
import { useDebounce, useClickAway } from '@hooks'
import ProfileImage from '@images/profile_default.png'

const UserSearchContainer = styled.div`
  width: 480px;
  height: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .user-result-container {
    width: 90%;
    height: 420px;
    overflow-y: scroll;
    border-bottom: solid 1px #e1e1e1;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      height: 30%;
      background: #d9d9d9;
      border-radius: 5px;
    }
  }
`

const UserSearchInput = styled.div`
  width: 90%;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #f6f6f6;
  border-radius: 8px;
  color: #e1e1e1;
  .searchbar-icon {
    margin-left: 4%;
    margin-bottom: 4px;
  }
  .searchbar-text {
    height: 40px;
    max-width: 800px;
    background-color: #f6f6f6;
    margin-left: 6.5%;
    border: none;
    outline: none;
    color: #a5a3af;
    font-size: 16px;
  }
`

const UserSearchResult = styled.div`
  .another-user {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #a5a3af;
    padding: 8px 0px;
    overflow-x: hidden;
    border-bottom: solid 1px #e1e1e1;
    .user-avatar {
      width: 36px;
      height: 36px;
    }
    .user-name {
      margin-left: 4%;
      font-size: 16px;
    }
  }
`

const UserSearch = ({ showModal, onClose, closeOnClick }) => {
  const [keyword, setKeyword] = useState('')
  const [searchedUserList, setSearchedUserList] = useState([])

  useDebounce(
    async () => {
      if (keyword === '') {
        setSearchedUserList([])
        return
      }

      const userList = await getSearchedUserList(keyword)
      const result = parseUserFullName(userList).filter((user) => user.fullName.includes(keyword))
      setSearchedUserList([...result])
    },
    200,
    [keyword]
  )

  useEffect(() => {
    setKeyword('')
    setSearchedUserList([])
  }, [showModal])

  const parseUserFullName = (searchedUserList) => {
    try {
      return searchedUserList.map((user) => {
        return {
          id: user._id,
          fullName: JSON.parse(user.fullName).fullName,
          image: user.image,
        }
      })
    } catch (e) {
      return searchedUserList
    }
  }

  const onClickModalWrapper = useClickAway(() => {
    closeOnClick && onClose && onClose()
  })

  return (
    <UserSearchContainer>
      <UserSearchInput>
        <Icon className="searchbar-icon" name={'search'} size={15} color={'black'} />
        <Input
          style={{ width: '370px', border: 'none' }}
          className="searchbar-text"
          placeholder="찾으시는 사용자가 있나요?"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </UserSearchInput>
      <div className="user-result-container">
        {searchedUserList?.map((user) => {
          return (
            <Fragment key={user.id}>
              <UserSearchResult onClick={() => onClickModalWrapper}>
                <Link to={`/users/${user.id}`} className="another-user">
                  <Avatar src={user.image || ProfileImage} size={36} className="user-avatar" />
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
