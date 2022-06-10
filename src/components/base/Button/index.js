import styled from '@emotion/styled'
import './Button.css'
import PropTypes from 'prop-types'

const DefaultButton = styled.button`
  cursor: pointer;
  border: none;
  transition-duration: 0.2s;
  transition-property: transform;

  &:hover {
    transform: scale(1.05);
  }
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
