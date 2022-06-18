import styled from '@emotion/styled'
import { Input, Button, Title, Image } from '@components'
import { Fragment, useEffect, useState } from 'react'
import { getBookList } from '@utils/api/getBookList'
import uuid from 'react-uuid'

const DEFAULT_IMAGE_URL = 'https://via.placeholder.com/200?text=LUVOOK'

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

const initialState = {
  selectedBookTitle: '',
  selectedBookThumbnail: DEFAULT_IMAGE_URL,
  keyword: '',
  searchedBookList: [],
}

const BookSearch = ({ showModal, onChange }) => {
  const [state, setState] = useState(initialState)

  const onSearch = async (e) => {
    e.preventDefault()
    if (!state.keyword) return
    const updatedBookList = await getBookList(state.keyword)
    setState({ ...state, searchedBookList: [...updatedBookList.documents] })
  }

  const onClickList = (e) => {
    e.preventDefault()
    const { value: thumbnail, title } = e.target
    setState({ ...state, selectedBookThumbnail: thumbnail, selectedBookTitle: title })
  }

  useEffect(() => {
    setState(initialState)
  }, [showModal])

  useEffect(() => {
    onChange({ bookTitle: state.selectedBookTitle, bookImage: state.selectedBookThumbnail })
  }, [state])

  return (
    <Fragment>
      <BookSearchContainer>
        <LeftBox>
          <Title level={2} style={{ margin: 0 }}>
            책을 선택해주세요!
          </Title>
          <Image
            src={state.selectedBookThumbnail}
            width={150}
            height={200}
            placeholder="책 이미지"
            alt="책 제목"
          />
        </LeftBox>
        <RightBox>
          <SearchBar>
            <Input
              placeholder="책을 검색해주세요."
              block
              value={state.keyword}
              onChange={(e) => setState({ ...initialState, keyword: e.target.value })}
            />
            <Button onClick={onSearch}>검색</Button>
          </SearchBar>
          <BookList>
            {state.searchedBookList.map((book) => (
              <li key={uuid()}>
                <label>
                  <input
                    type="radio"
                    title={book.title}
                    value={book.thumbnail}
                    onClick={onClickList}
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
