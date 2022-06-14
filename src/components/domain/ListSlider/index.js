import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/grid'
import { BookCard } from '@components'
import { Navigation, Grid } from 'swiper'

const slideContextCenterStyle = {
  width: 'fit-content',
  display: 'flex',
  justifyContent: 'space-between',
  '-webkit-box-pack': 'center',
  '-ms-flex-pack': 'center',
  '-webkit-justify-content': 'center',
  'justify-content': 'center',
  '-webkit-box-align': 'center',
  '-ms-flex-align': 'center',
  '-webkit-align-items': 'center',
  'align-items': 'center',
}

const ListSlider = ({
  posts,
  slidesPerView = 4,
  slidesPerGroup = 4,
  slideStyle,
  grid,
  handleClick,
  swiperStyle,
  ...props
}) => {
  return (
    <>
      <Swiper
        style={{
          ...swiperStyle,
        }}
        navigation={true}
        modules={[Navigation, Grid]}
        slidesPerGroup={slidesPerGroup}
        slidesPerView={slidesPerView}
        grid={grid}
        {...props}
      >
        {posts.map((post) => {
          return (
            <SwiperSlide
              style={{
                ...slideContextCenterStyle,
                ...slideStyle,
                width: 'fit-content',
                height: 'fit-content',
              }}
              key={post._id}
            >
              <BookCard post={post} handleOnClick={handleClick} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}

ListSlider.propTypes = {
  posts: PropTypes.array,
  slidesPerView: PropTypes.number,
  slidesPerGroup: PropTypes.number,
  grid: PropTypes.shape({
    fill: PropTypes.oneOf(['row', 'column']),
    rows: PropTypes.number,
  }),
  handleOnClick: PropTypes.func,
}

export default ListSlider
