import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const Line = styled.hr`
  border: none;
  background-color: #743737;

  &.vertical {
    position: relative;
    top: -1px;
    display: inline-block;
    width: 1px;
    height: 13px;
    vertical-align: middle;
  }

  &.horizontal {
    display: block;
    height: 1px;
  }
`

const Divider = ({ type = 'horizontal', width = '100%', size = 8, ...props }) => {
  const dividerStyle = {
    margin: type === 'vertical' ? `0 ${size}px` : `${size}px 0`,
  }

  return (
    <Line {...props} width={width} className={type} style={{ ...dividerStyle, ...props.style }} />
  )
}

Divider.propTypes = {
  type: PropTypes.oneOf(['horizontal', 'vertical']),
  size: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Divider
