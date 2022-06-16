import { Text } from '@components'

const ErrorText = ({ children }) => {
  return (
    <Text size="small" color="red">
      {children}
    </Text>
  )
}

export default ErrorText
