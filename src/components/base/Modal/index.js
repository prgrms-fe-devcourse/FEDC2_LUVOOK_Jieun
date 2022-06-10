import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import ReactDOM from 'react-dom'
import { useEffect, useMemo } from 'react'
import { useClickAway } from '@hooks'

const BackgroundDim = styled.div`
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 8px;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  box-sizing: border-box;
  border-radius: 8px;
`

// Todo
// 1. 버튼 안에 'X'를 아이콘으로 변경
// 2. 임시로 최소 스타일링만 해놓았습니다, color같은 부분은 추후 디자인할때 다시 수정하면 좋을 것 같아요.
const ModalCloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #fafafa;
  border: 0.5px solid gray;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`

const Modal = ({
  children,
  width,
  height,
  visible = false,
  onClose,
  closeOnClickOutside = true,
  ...props
}) => {
  const onClickModalWrapper = useClickAway(() => {
    closeOnClickOutside && onClose && onClose()
  })

  const containerStyle = useMemo(
    () => ({
      width,
      height,
    }),
    [width, height]
  )

  const portalDivFragment = useMemo(() => document.createElement('div'), [])
  useEffect(() => {
    document.body.appendChild(portalDivFragment)
    return () => {
      document.body.removeChild(portalDivFragment)
    }
  })

  return ReactDOM.createPortal(
    <BackgroundDim style={{ display: visible ? 'block' : 'none' }}>
      <ModalContainer
        ref={onClickModalWrapper}
        {...props}
        style={{ ...props.style, ...containerStyle }}
      >
        <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
        {children}
      </ModalContainer>
    </BackgroundDim>,
    portalDivFragment
  )
}

Modal.defaultProps = {
  closeOnClickOutside: true,
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  closeOnClickOutside: PropTypes.bool,
}

export default Modal
