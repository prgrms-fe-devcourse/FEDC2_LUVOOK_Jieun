import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const DefaultButton = styled.button`
  cursor: pointer;
`

const Button = ({ children, onClick, ...props }) => {
  return (
    <DefaultButton onClick={onClick} style={{ ...props.style }} {...props}>
      {children}
    </DefaultButton>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
}

export default Button
