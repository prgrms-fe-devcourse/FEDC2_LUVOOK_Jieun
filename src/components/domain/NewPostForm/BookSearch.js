import styled from '@emotion/styled'
import { Input, Button, Title, Image } from '@components'
import { Fragment, useState } from 'react'
import { getBookList } from '@utils/api/getBookList'
import uuid from 'react-uuid'

const DEFAULT_IMAGE_URL = 'https://source.unsplash.com/random'

const BookSearchContainer = styled.div`
  display: flex;
`

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RightBox = styled.div`
  flex: 1;
`

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
`

const BookList = styled.ul`
  margin: 0 auto;
  padding: 0;
`

const BookSearch = () => {
  const [imgUrl, setImgUrl] = useState(DEFAULT_IMAGE_URL)
  const [keyword, setKeyword] = useState('')
  const [bookList, setBookList] = useState([])

  const onChangeKeyword = (e) => {
    setBookList([])
    setImgUrl(DEFAULT_IMAGE_URL)
    setKeyword(e.target.value)
  }

  const onSearch = async (e) => {
    e.preventDefault()
    if (!keyword) return
    const bookList = await getBookList(keyword)
    setBookList([...bookList.documents])
  }

  const onChangeImage = (e) => setImgUrl(e.target.value)

  return (
    <Fragment>
      <BookSearchContainer>
        <LeftBox>
          <Title level={2} style={{ margin: 0 }}>
            책을 선택해주세요!
          </Title>
          <Image src={imgUrl} width={150} height={200} placeholder="책 이미지" alt="책 제목" />
        </LeftBox>
        <RightBox>
          <SearchBar>
            <Input placeholder="책을 검색해주세요." block required onChange={onChangeKeyword} />
            <Button onClick={onSearch}>검색</Button>
          </SearchBar>
          <BookList>
            {bookList.map((book) => (
              <li key={uuid()}>
                <label>
                  <input
                    type="radio"
                    name="book-title"
                    value={book.thumbnail}
                    onClick={onChangeImage}
                  />
                  {book.title}
                </label>
              </li>
            ))}
          </BookList>
        </RightBox>
      </BookSearchContainer>
    </Fragment>
  )
}

export default BookSearch
