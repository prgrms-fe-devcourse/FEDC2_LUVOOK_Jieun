import axios from 'axios'
// TODO
// 1. 다른 작업자들은 루트에 .env 파일을 만들고 REACT_APP_KAKAO_API_BOOK_KEY 이름의 환경변수를 추가해야한다.
// 2. KAKAO_API_END_POINT는 constants 파일로 이동시켜야 한다.
const { REACT_APP_KAKAO_API_BOOK_KEY } = process.env
const KAKAO_API_END_POINT = 'https://dapi.kakao.com/v3/search/book'

export const getBookListByKeyword = async (keyword) => {
  if (!keyword) return
  return await axios
    .get(`${KAKAO_API_END_POINT}?page=1&size=25&query=${keyword}`, {
      headers: {
        Authorization: `KakaoAK ${REACT_APP_KAKAO_API_BOOK_KEY}`,
      },
    })
    .then((res) => res.data)
}
