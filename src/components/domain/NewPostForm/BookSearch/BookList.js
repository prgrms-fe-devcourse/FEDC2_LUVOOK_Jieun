import styled from '@emotion/styled'
import uuid from 'react-uuid'

const Container = styled.ul`
  margin: 4px auto 0;
  padding: 0 4px 0 0;
  height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(116, 55, 55, 0.6);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(116, 55, 55, 0.5);
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`

const List = styled.li`
  padding: 4px;
  border-radius: 4px;
  list-style: none;
  background-color: ${({ selected, thumbnail }) =>
    selected === thumbnail ? 'rgba(116, 55, 55, 0.7)' : 'inherit'};
  font-weight: ${({ selected, thumbnail }) => (selected === thumbnail ? 600 : 400)};
  color: ${({ selected, thumbnail }) => (selected === thumbnail ? 'white' : 'inherit')};

  label:hover {
    cursor: pointer;
    font-weight: 600;
  }

  input[type='radio'] {
    display: none;
  }
`

const BookList = ({ bookList, selected, onClickList }) => {
  return (
    <Container>
      {bookList.map((book) => (
        <List key={uuid()} selected={selected} thumbnail={book.thumbnail}>
          <input
            type="radio"
            id={book.thumbnail}
            name="book"
            title={book.title}
            value={book.thumbnail}
            onClick={onClickList}
          />
          <label htmlFor={book.thumbnail}>{book.title}</label>
        </List>
      ))}
    </Container>
  )
}

export default BookList
