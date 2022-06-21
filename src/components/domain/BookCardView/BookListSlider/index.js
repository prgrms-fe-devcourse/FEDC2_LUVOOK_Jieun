import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import './style.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/grid'
import { BookCard } from '@components'
import { Navigation, Grid } from 'swiper'

import React, { Fragment } from 'react'

const slideContextCenterStyle = {
  width: 'fit-content',
  display: 'flex',
  WebkitBoxPack: 'center',
  msFlexPack: 'center',
  WebkitJustifyContent: 'center',
  justifyContent: 'center',
  WebkitBoxAlign: 'center',
  msFlexAlign: 'center',
  WebkitAlignItems: 'center',
  alignItems: 'center',
}

const BookListSlider = ({
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
    <Fragment>
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
    </Fragment>
  )
}

BookListSlider.propTypes = {
  posts: PropTypes.array,
  slidesPerView: PropTypes.number,
  slidesPerGroup: PropTypes.number,
  grid: PropTypes.shape({
    fill: PropTypes.oneOf(['row', 'column']),
    rows: PropTypes.number,
  }),
  handleOnClick: PropTypes.func,
}

export default BookListSlider
