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

  const updateChange = async (e) => {
    const data = e.target.value
    if (!data) {
      setSearchedUserList([])
      return
    }
    const userList = await getSearchedUserList(data)
    setSearchedUserList(userList)
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
          onChange={(e) => updateChange(e)}
        ></Input>
      </UserSearchInput>

      {searchedUserList?.map((item) => {
        return (
          <Fragment key={item._id}>
            <UserSearchResult>
              <Link to={`/users/${item.fullName}`}>
                <p>{item.fullName}</p>
              </Link>
            </UserSearchResult>
          </Fragment>
        )
      })}
    </UserSearchContainer>
  )
}

export default UserSearch
