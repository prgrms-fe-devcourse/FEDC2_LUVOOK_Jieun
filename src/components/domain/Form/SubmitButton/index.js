import { Button } from '@components'

const SubmitButton = ({ children, onClick }) => {
  const submitButtonStyle = {
    fontSize: '16px',
    height: '40px',
    borderRadius: '4px',
    boxSizing: 'border-box',
    border: 'none',
    backgroundColor: '#9e7373',
    color: 'white',
    marginTop: '10px',
  }

  return (
    <Button onClick={onClick} style={submitButtonStyle}>
      {children}
    </Button>
  )
}

export default SubmitButton
