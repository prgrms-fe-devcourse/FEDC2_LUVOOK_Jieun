import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import ImageComponent from '../Image'
import PropTypes from 'prop-types'
import ProfileImage from '@images/profile_default.png'

const ShapeToCssValue = {
  circle: '50%',
  round: '40px',
  square: '0',
}

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
  border-radius: ${({ shape }) => ShapeToCssValue[shape]};
  background-color: #eee;
  overflow: hidden;

  > img {
    transition: opacity 0.2s ease-out;
  }
`
const Avatar = ({
  lazy,
  threshold,
  src = ProfileImage,
  size = 70,
  shape = 'circle',
  placeholder,
  alt,
  mode = 'cover',
  ...props
}) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const image = new Image()
    image.src = src
    image.onload = () => setLoaded(true)
  }, [src])

  return (
    <AvatarWrapper {...props} shape={shape}>
      <ImageComponent
        block
        lazy={lazy}
        threshold={threshold}
        width={size}
        height={size}
        src={src}
        placeholder={placeholder}
        alt={alt}
        mode={mode}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </AvatarWrapper>
  )
}

Avatar.propTypes = {
  lazy: PropTypes.bool,
  threshold: PropTypes.number,
  placeholder: PropTypes.string,
  src: PropTypes.string,
  size: PropTypes.number,
  shape: PropTypes.oneOf(['circle', 'round', 'square']),
  alt: PropTypes.string,
  mode: PropTypes.oneOf(['cover', 'fill', 'contain']),
}

export default Avatar
