import { Button } from '@components'
import styled from '@emotion/styled'

const SubmitButtonStyle = styled(Button)`
  font-size: 16px;
  height: 40px;
  border-radius: 4px;
  box-sizing: border-box;
  border: none;
  background-color: var(--color-light-primary);
  color: white;

  &:hover {
    background-color: var(--color-primary);
  }
`

const SubmitButton = ({ children, onClick, isLoginButton }) => {
  const submitButtonStyle = {
    marginTop: isLoginButton ? 0 : '10px',
  }

  return (
    <SubmitButtonStyle onClick={onClick} style={submitButtonStyle}>
      {children}
    </SubmitButtonStyle>
  )
}

export default SubmitButton
