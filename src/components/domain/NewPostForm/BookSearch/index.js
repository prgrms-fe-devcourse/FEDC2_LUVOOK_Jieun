import styled from '@emotion/styled'
import { Input, Button, Icon } from '@components'
import { useEffect, useState } from 'react'
import { getBookList } from '@utils/api/getBookList'
import BookList from './BookList'

const DEFAULT_IMAGE_URL = 'https://via.placeholder.com/200?text=LUVOOK'

const Container = styled.div`
  height: 200px;
  margin-left: 8px;
  flex: 1;
`

const SearchBar = styled.div`
  display: flex;
`

const SearchButton = styled(Button)`
  margin-left: 4px;
  border: none;
  border-radius: 4px;
  background-color: rgba(116, 55, 55, 0.7);
  color: white;
  &:hover {
    background-color: rgba(116, 55, 55, 0.9);
  }
`

const initialState = {
  selectedBookTitle: '',
  selectedBookThumbnail: DEFAULT_IMAGE_URL,
  keyword: '',
  searchedBookList: [],
}

const BookSearch = ({ showModal, onChange }) => {
  const [state, setState] = useState(initialState)

  const handleChangeKeyword = (e) => {
    setState({ ...initialState, keyword: e.target.value })
  }

  const handleClickSearchButton = async (e) => {
    e.preventDefault()
    if (!state.keyword) return
    const { documents } = await getBookList(state.keyword)
    const searchedBooks = documents.filter(({ title, thumbnail }) => title && thumbnail)
    setState({ ...state, searchedBookList: [...searchedBooks] })
  }

  const handleClickList = (e) => {
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
    <Container>
      <SearchBar>
        <Input
          placeholder="책을 검색해주세요."
          block
          value={state.keyword}
          onChange={handleChangeKeyword}
          wrapperProps={{ style: { flex: 1 } }}
          style={{ height: '32px' }}
        />
        <SearchButton onClick={handleClickSearchButton}>
          <Icon name="search" color="white" size={24} onClick={handleClickSearchButton} />
        </SearchButton>
      </SearchBar>
      {state.searchedBookList.length > 0 && (
        <BookList
          bookList={state.searchedBookList}
          selected={state.selectedBookThumbnail}
          onClickList={handleClickList}
        />
      )}
    </Container>
  )
}

export default BookSearch
