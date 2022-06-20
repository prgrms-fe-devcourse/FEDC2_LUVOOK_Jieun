import styled from '@emotion/styled'
import { Title, Icon } from '@components'

const Container = styled(Title)`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
`

const Label = ({ value, text, ...props }) => {
  return (
    <Container level={2} style={{ marginBottom: '8px' }} {...props}>
      <Icon
        name={value ? 'check-square' : 'square'}
        size={24}
        color={value ? 'green' : 'rgba(116, 55, 55, 0.7)'}
        style={{ marginRight: '8px' }}
      />
      {text}
    </Container>
  )
}

export default Label
