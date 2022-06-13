import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/grid'
import { Image } from '@components'
import { Navigation, Grid } from 'swiper'

// 이 속성이 없으면, 스크롤 시 보이는 이미지가
// 무조건 왼쪽으로 감
const slideContextCenterStyle = {
  width: 'fit-content',
  display: '-webkit-box',
  display: '-ms-flexbox',
  display: '-webkit-flex',
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

// 임시 값
const ListSliderItems = styled.div`
  width: 167px;
  height: 300px;
  border: 1px solid #dadada;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const ListSlider = ({
  posts,
  slidesPerView = 4,
  slidesPerGroup = 4,
  slideStyle,
  grid,
  handleOnClick,
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
        {posts.map((post) => (
          <SwiperSlide style={{ ...slideContextCenterStyle, ...slideStyle }} key={post._id}>
            <ListSliderItems onClick={() => handleOnClick(post)}>
              <Image width={167} height={200} src={post.image} alt={post.title.bookTitle} />
              <h1>{post.title.bookTitle}</h1>
            </ListSliderItems>
          </SwiperSlide>
        ))}
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
