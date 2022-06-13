import styled from '@emotion/styled'
import { Input, Button, Title, Image } from '@components'

const defaultImageUrl = 'https://source.unsplash.com/random'

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
  return (
    <>
      <BookSearchContainer>
        <LeftBox>
          <Title level={2} style={{ margin: 0 }}>
            책을 선택해주세요!
          </Title>
          <Image
            src={defaultImageUrl}
            width={150}
            height={200}
            placeholder="책 이미지"
            alt="책 제목"
          />
        </LeftBox>
        <RightBox>
          <SearchBar>
            <Input placeholder="책을 검색해주세요." block required />
            <Button>검색</Button>
          </SearchBar>
          <BookList>책 리스트...</BookList>
        </RightBox>
      </BookSearchContainer>
    </>
  )
}

export default BookSearch
