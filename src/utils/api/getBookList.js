import axios from 'axios'
const { REACT_APP_KAKAO_API_BOOK_KEY } = process.env
const KAKAO_API_END_POINT = 'https://dapi.kakao.com/v3/search/book'

export const getBookList = async (keyword) => {
  if (!keyword) return
  return await axios
    .get(`${KAKAO_API_END_POINT}?page=1&size=25&query=${keyword}`, {
      headers: {
        Authorization: `KakaoAK ${REACT_APP_KAKAO_API_BOOK_KEY}`,
      },
    })
    .then((res) => res.data)
}
