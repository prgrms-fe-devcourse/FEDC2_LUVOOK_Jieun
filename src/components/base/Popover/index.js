import styled from '@emotion/styled'
import { useClickAway } from '@hooks'

const PopoverContainer = styled.div`
  position: relative;
`

const Popover = ({ children, show, targetId, onClose, props }) => {
  const ref = useClickAway((e) => {
    if (e.target.id !== targetId) {
      onClose && onClose()
    }
  })

  return (
    <PopoverContainer ref={ref} style={{ display: show ? 'block' : 'none' }} {...props}>
      {children}
    </PopoverContainer>
  )
}

export default Popover
