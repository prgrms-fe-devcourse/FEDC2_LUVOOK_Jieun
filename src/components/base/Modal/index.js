import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import ReactDOM from 'react-dom'
import { useEffect, useMemo } from 'react'
import useClickAway from '../../../hooks/useClickAway'

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
  transform: translate(-50%, -50%);
  padding: 8px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  box-sizing: border-box;
  border-radius: 8px;
`

const Modal = ({ children, width, height, visible = false, onClose, ...props }) => {
  const ref = useClickAway(() => {
    onClose && onClose()
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
      <ModalContainer ref={ref} {...props} style={{ ...props.style, ...containerStyle }}>
        {children}
      </ModalContainer>
    </BackgroundDim>,
    portalDivFragment
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  visible: PropTypes.bool,
  onClose: PropTypes.func,
}

export default Modal
