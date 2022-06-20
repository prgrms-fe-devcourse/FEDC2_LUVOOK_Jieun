import { useState, Fragment } from 'react'
import styled from '@emotion/styled'
import { getSearchedUserList } from '@apis'
import { Input, Icon } from '@components'
import { Link } from 'react-router-dom'

const UserSearchContainer = styled.div`
  width: 480px;
  height: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const UserSearchInput = styled.div`
  width: 60%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
`

const UserSearchResult = styled.div``

const UserSearch = () => {
  const [searchedUserList, setSearchedUserList] = useState([])

  const parseUserFullName = (searchedUserList) => {
    try {
      return searchedUserList.map((user) => {
        return {
          id: user._id,
          fullName: JSON.parse(user.fullName),
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
      const result = parseUserFullName(userList)

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

      {searchedUserList?.map((user) => {
        const { fullName, quote } = user.fullName

        return (
          <Fragment key={user.id}>
            <UserSearchResult>
              <Link to={`/users/${user.id}`}>
                <p>{fullName}</p>
              </Link>
            </UserSearchResult>
          </Fragment>
        )
      })}
    </UserSearchContainer>
  )
}

export default UserSearch
