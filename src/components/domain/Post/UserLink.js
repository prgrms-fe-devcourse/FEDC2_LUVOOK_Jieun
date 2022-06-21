import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link as ReactRouterLink } from 'react-router-dom'

const Link = styled(ReactRouterLink)`
  text-decoration: none;
  color: inherit;
  &:hover {
    font-weight: 600;
  }
`

const UserLink = ({ userId, username }) => {
  return <Link to={`/users/${userId}`}>{username}</Link>
}

UserLink.propTypes = {
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

export default UserLink
