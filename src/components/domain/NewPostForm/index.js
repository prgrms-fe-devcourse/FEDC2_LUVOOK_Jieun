import styled from '@emotion/styled'
import { Input, Button, Title, Select } from '@components'
import BookSearch from './BookSearch'
import { useState } from 'react'

// TODO
// utils로 옮겨야 한다.
const CATEGORY_MAP = {
  ALL: 'all',
  NOVEL: '소설',
  POETRY: '시',
}

const PRIMARY_COLOR = '#743737'

const PostContainerForm = styled.form`
  position: relative;
  width: 780px;
  max-height: 85vh;
  padding: 16px;
  overflow: auto;
`

const Textarea = styled.textarea`
  resize: none;
  width: 100%;
  padding: 6px 8px;
  border: 1px solid ${({ invalid }) => (invalid ? 'red' : PRIMARY_COLOR)};
  border-radius: 4px;
  box-sizing: border-box;
`

const SubmitButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`

const NewPostForm = ({ data, onSubmit }) => {
  const { title, image, channelID } = data
  return (
    <PostContainerForm>
      <BookSearch image={image} />
      <div>
        <Title level={2} style={{ margin: 0 }}>
          책의 장르를 선택해주세요.
        </Title>
        <Select
          data={Object.values(CATEGORY_MAP)}
          placeholder={'장르 선택'}
          onChange={(e) => {
            console.log(e.target.value)
          }}
        />
      </div>
      <div>
        <Title level={2} style={{ margin: 0 }}>
          문구를 입력해주세요!
        </Title>
        <Input placeholder="문구를 입력해주세요" block required />
      </div>
      <div>
        <Title level={2} style={{ margin: 0 }}>
          내용을 입력해주세요!
        </Title>
        <Textarea placeholder="내용을 입력해주세요" rows={10} />
      </div>
      <SubmitButtons>
        <Button>글 작성하기</Button>
        <Button>취소</Button>
      </SubmitButtons>
    </PostContainerForm>
  )
}

export default NewPostForm
