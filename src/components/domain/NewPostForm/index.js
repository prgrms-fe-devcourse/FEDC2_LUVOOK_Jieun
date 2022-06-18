import styled from '@emotion/styled'
import { Input, Button, Title, Select } from '@components'
import BookSearch from './BookSearch'
import { useCallback, useEffect, useRef, useState } from 'react'

// TODO
// utils로 옮겨야 한다.
const CHANNEL_CATEGORY_MAP = {
  DEFAULT: '장르 선택',
  NOVEL: '소설',
  POETRY: '시',
}

const DEFAULT_IMAGE_URL = 'https://via.placeholder.com/200?text=LUVOOK'

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

const initialValues = {
  channel: '',
  bookImage: DEFAULT_IMAGE_URL,
  bookTitle: '',
  postQuote: '',
  postContent: '',
}

const NewPostForm = ({ showModal, onClose }) => {
  const [state, setState] = useState(initialValues)

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO
    // state를 통해 submit을 수행해야 한다. (formik + api)
    console.log(state)
    onClose('submit')
    setState(initialValues)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    onClose && onClose('cancel')
    setState(initialValues)
  }

  const handleChange = ({ bookTitle, bookImage }) => {
    setState({ ...state, bookTitle, bookImage })
  }

  useEffect(() => {
    setState(initialValues)
  }, [showModal])

  return (
    <PostContainerForm onSubmit={handleSubmit}>
      <BookSearch showModal={showModal} onChange={handleChange} />
      <div>
        <Title level={2} style={{ margin: 0 }}>
          책의 장르를 선택해주세요.
        </Title>
        <Select
          data={Object.values(CHANNEL_CATEGORY_MAP)}
          value={state.channel}
          placeholder="장르 선택"
          onChange={(e) => setState({ ...state, channel: e.target.value })}
        />
      </div>
      <div>
        <Title level={2} style={{ margin: 0 }}>
          문구를 입력해주세요!
        </Title>
        <Input
          placeholder="문구를 입력해주세요"
          block
          value={state.postQuote}
          onChange={(e) => setState({ ...state, postQuote: e.target.value })}
        />
      </div>
      <div>
        <Title level={2} style={{ margin: 0 }}>
          내용을 입력해주세요!
        </Title>
        <Textarea
          placeholder="내용을 입력해주세요"
          rows={10}
          value={state.postContent}
          onChange={(e) => setState({ ...state, postContent: e.target.value })}
        />
      </div>
      <SubmitButtons>
        <Button onClick={handleSubmit}>글 작성하기</Button>
        <Button onClick={handleCancel}>취소</Button>
      </SubmitButtons>
    </PostContainerForm>
  )
}

export default NewPostForm
