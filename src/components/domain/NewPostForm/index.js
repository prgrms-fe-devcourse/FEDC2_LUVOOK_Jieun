import styled from '@emotion/styled'
import { Input, Button, Title, Select } from '@components'
import BookSearch from './BookSearch'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'

// TODO
// utils로 옮겨야 한다.
const CHANNEL_CATEGORY_MAP = {
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
  const { values, setValues, handleSubmit, handleChange, handleReset } = useFormik({
    initialValues,
    onSubmit: async (formData) => {
      if (Object.values(values).some((item) => item.length === 0)) {
        window.alert('내용을 모두 입력해주세요.')
        return
      }
      const submitData = async () => {
        await console.log(formData)
        handleReset()
      }
      onClose && onClose('SUBMIT', submitData)
    },
  })

  const handleCancel = (e) => {
    e.preventDefault()
    onClose && onClose('CANCEL', handleReset)
  }

  const onChangeBookSearchValues = ({ bookTitle, bookImage }) => {
    setValues({ ...values, bookTitle, bookImage })
  }

  useEffect(() => {
    handleReset()
  }, [showModal])

  return (
    <PostContainerForm onSubmit={handleSubmit}>
      <BookSearch showModal={showModal} onChange={onChangeBookSearchValues} />
      <div>
        <Title level={2} style={{ margin: 0 }}>
          책의 장르를 선택해주세요.
        </Title>
        <Select
          name="channel"
          data={Object.values(CHANNEL_CATEGORY_MAP)}
          value={values.channel}
          placeholder="장르 선택"
          onChange={handleChange}
        />
      </div>
      <div>
        <Title level={2} style={{ margin: 0 }}>
          문구를 입력해주세요!
        </Title>
        <Input
          name="postQuote"
          placeholder="문구를 입력해주세요"
          block
          value={values.postQuote}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>
      <div>
        <Title level={2} style={{ margin: 0 }}>
          내용을 입력해주세요!
        </Title>
        <Textarea
          name="postContent"
          placeholder="내용을 입력해주세요"
          rows={10}
          value={values.postContent}
          onChange={handleChange}
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
