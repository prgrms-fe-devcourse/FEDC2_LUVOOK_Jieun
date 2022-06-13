import { useState } from 'react'
import { Popover, Avatar } from '@components'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

const UserElement = styled.div`
  position: absolute;
  margin-left: 10px;
  top: 5px;
  right: 0;
  width: 120px;
  height: auto;
  background-color: #743737;
  color: white;
  list-style: none;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  a {
    text-decoration: none;
    color: #ffffff;
    li {
      padding: 7px;
    }
    li:hover {
      cursor: pointer;
    }
  }
`

const User = () => {
  const [userpop, setUserpop] = useState(false)

  return (
    <div>
      <Avatar
        src={'https://picsum.photos/200'}
        size={40}
        id="user"
        onClick={() => setUserpop(true)}
      />
      <Popover show={userpop} targetId="user" onClose={() => setUserpop(false)}>
        <UserElement>
          <Link to="/users/:username">
            <li>마이 페이지</li>
          </Link>
          <Link to="/login">
            <li>로그아웃</li>
          </Link>
        </UserElement>
      </Popover>
    </div>
  )
}

export default User
