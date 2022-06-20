import PropTypes from 'prop-types'

const Title = ({ children, level = 1, strong, color, ...props }) => {
  let Tag = `h${level}`
  if (level < 1 || level > 6) {
    console.warn("Title only accept '1 | 2 | 3 | 4 | 5 | 6' as level value.")
    Tag = 'h1'
  }

  const fontStyle = {
    fontWeight: strong ? 'bold' : 'normal',
    color,
  }

  return (
    <Tag style={{ ...props.style, ...fontStyle }} {...props}>
      {children}
    </Tag>
  )
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.number,
  strong: PropTypes.bool,
  color: PropTypes.string,
}

export default Title
