import PropTypes from 'prop-types'
import { useState, useRef, useEffect } from 'react'

let observer = null
const LOAD_IMG_EVENT_TYPE = 'loadImage'
const PLAYCEHOLDER_SRC = 'https://via.placeholder.com/200?text=LUVOOK'

const onIntersection = (entries, io) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target)
      entry.target.dispatchEvent(new CustomEvent(LOAD_IMG_EVENT_TYPE))
    }
  })
}

const Image = ({
  lazy,
  threshold = 0.3,
  placeholder = PLAYCEHOLDER_SRC,
  src,
  block,
  width,
  height,
  alt,
  mode,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef(null)

  const imageStyle = {
    display: block ? 'block' : undefined,
    width,
    height,
    objectFit: mode,
    filter: loaded ? 'none' : 'blur(10px)',
    'clip-path': loaded ? 'none' : 'inset(0)',
    transition: loaded ? 'filter 0.5s linear' : undefined,
  }

  useEffect(() => {
    if (!lazy) {
      setLoaded(true)
      return
    }

    const handleLoadImage = () => setLoaded(true)

    const imgElement = imgRef.current
    imgElement && imgElement.addEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage)

    return () => {
      imgElement && imgElement.addEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage)
    }
  }, [lazy])

  useEffect(() => {
    if (!lazy) return
    observer = new IntersectionObserver(onIntersection, { threshold })
    imgRef.current && observer.observe(imgRef.current)
  }, [lazy, threshold])

  return (
    <img
      ref={imgRef}
      src={loaded ? src : placeholder}
      style={{ ...props.style, ...imageStyle }}
      alt={alt}
    />
  )
}

Image.propTypes = {
  lazy: PropTypes.bool,
  threshold: PropTypes.number,
  placeholder: PropTypes.string,
  src: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  alt: PropTypes.string,
  mode: PropTypes.string,
}
export default Image
