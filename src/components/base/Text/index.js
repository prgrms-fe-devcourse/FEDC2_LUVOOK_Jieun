import PropTypes from 'prop-types'

const fontSizeMap = {
  small: 12,
  normal: 16,
  large: 20,
}

const formattedSize = (size) => {
  if (fontSizeMap[size]) return fontSizeMap[size]

  if (typeof size === 'number') return size

  return fontSizeMap['normal']
}

const Text = ({ children, size, color, block, paragraph, strong, ...props }) => {
  const Tag = block ? 'div' : paragraph ? 'p' : 'span'

  const fontStyle = {
    fontWeight: strong ? 'bold' : undefined,
    fontSize: formattedSize(size),
    color,
  }

  return (
    <Tag style={{ ...props.style, ...fontStyle }} {...props}>
      {children}
    </Tag>
  )
}

Text.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['small', 'normal', 'large'])]),
  block: PropTypes.bool,
  paragraph: PropTypes.bool,
  strong: PropTypes.bool,
}

export default Text
