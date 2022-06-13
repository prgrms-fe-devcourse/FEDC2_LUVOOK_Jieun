import styled from '@emotion/styled'
import { Input, Button, Title, Image } from '@components'

const PRIMARY_COLOR = '#743737'
const defaultImage = 'https://source.unsplash.com/random'

const NewPostFormContainer = styled.form`
  position: relative;
  width: 780px;
  max-height: 85vh;
  padding: 16px;
  overflow: auto;
`

/************ Book Choice ************/

const BookChoiceContainer = styled.div`
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
  margin: 0;
  padding: 0;
`

const BookChoice = () => {
  return (
    <>
      <BookChoiceContainer>
        <LeftBox>
          <Title level={2} style={{ margin: 0 }}>
            책을 선택해주세요!
          </Title>
          <Image
            src={defaultImage}
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
              required
              wrapperProps={{ style: { width: '80%' } }}
            />
            <Button>검색</Button>
          </SearchBar>
          <BookList>책 리스트...</BookList>
        </RightBox>
      </BookChoiceContainer>
    </>
  )
}

/************ Contents Box ************/

const InputQuote = () => {
  return (
    <>
      <Title level={2} style={{ margin: 0 }}>
        문구를 입력해주세요!
      </Title>
      <Input placeholder="문구를 입력해주세요" block required />
    </>
  )
}

const Textarea = styled.textarea`
  resize: none;
  width: 100%;
  padding: 6px 8px;
  border: 1px solid ${({ invalid }) => (invalid ? 'red' : PRIMARY_COLOR)};
  border-radius: 4px;
  box-sizing: border-box;
`

const InputContent = () => {
  return (
    <>
      <Title level={2} style={{ margin: 0 }}>
        내용을 입력해주세요!
      </Title>
      <Textarea placeholder="내용을 입력해주세요" rows={10} />
    </>
  )
}

/************ Submit Buttons ************/

const SubmitButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`

const NewPostForm = () => {
  return (
    <NewPostFormContainer>
      <BookChoice />
      <InputQuote />
      <InputContent />
      <SubmitButtons>
        <Button>글 작성하기</Button>
        <Button>취소</Button>
      </SubmitButtons>
    </NewPostFormContainer>
  )
}

export default NewPostForm
