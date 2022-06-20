import styled from '@emotion/styled'
import { Input, Button, Select, Image } from '@components'
import { useEffect } from 'react'
import { useAsync } from '@hooks'
import { useFormik } from 'formik'
import { getChannelList, createPost } from '@apis'
import BookSearch from './BookSearch'
import Label from './Label'

// TODO
// utils로 옮겨야 한다.
const DEFAULT_IMAGE_URL = 'https://via.placeholder.com/200?text=LUVOOK'

const PRIMARY_COLOR = '#743737'

const Container = styled.div`
  padding-top: 24px;
`

const Form = styled.form`
  position: relative;
  width: 780px;
  max-height: 85vh;
  padding: 0 16px 16px;
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

const Section = styled.section`
  padding: 16px;
`

const BookSearchContainer = styled.div`
  display: flex;
`

const Textarea = styled.textarea`
  resize: none;
  width: 100%;
  padding: 8px;
  border: 1px solid ${({ invalid }) => (invalid ? 'red' : PRIMARY_COLOR)};
  border-radius: 4px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border: 2px solid #743737;
  }
`

const SubmitButton = styled(Button)`
  margin-left: 16px;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  background-color: rgba(116, 55, 55, 0.7);
  color: white;
  font-size: 16px;
  &:hover {
    background-color: rgba(116, 55, 55, 0.9);
  }
`

const initialValues = {
  channelName: '',
  bookImage: DEFAULT_IMAGE_URL,
  bookTitle: '',
  postQuote: '',
  postContent: '',
}

const NewPostForm = ({ showModal, onClose }) => {
  const { value: channelList } = useAsync(async () => {
    return await getChannelList()
  }, [])

  const { values, setValues, handleSubmit, handleChange, handleReset } = useFormik({
    initialValues,
    onSubmit: async (formData) => {
      if (Object.values(values).some((item) => item.length === 0)) {
        window.alert('내용을 모두 입력해주세요.')
        return
      }
      const submitData = async () => {
        const { channelName, bookImage, bookTitle, postQuote, postContent } = formData
        const channelId = channelList.filter((item) => item.name === channelName)[0]._id
        try {
          await createPost({
            title: JSON.stringify({
              bookTitle,
              bookImage,
              postQuote,
              postContent,
            }),
            channelId,
          })
          handleReset()
        } catch (e) {
          window.alert('게시물 생성에 실패했습니다.')
        }
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
    // eslint-disable-next-line
  }, [showModal])

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Section>
          <Label value={values.bookTitle} text="책을 선택해주세요." />
          <BookSearchContainer>
            <Image
              src={values.bookImage}
              width={180}
              height={240}
              placeholder="책 이미지"
              alt={values.bookTitle}
              style={{
                boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
              }}
            />
            <BookSearch showModal={showModal} onChange={onChangeBookSearchValues} />
          </BookSearchContainer>
        </Section>

        <Section>
          <Label value={values.channelName} text="책의 장르를 선택해주세요." />
          <Select
            name="channelName"
            data={channelList?.map((item) => item.name) || []}
            value={values.channelName}
            placeholder="장르 선택"
            _id={values.channelName}
            onChange={handleChange}
          />
        </Section>

        <Section>
          <Label value={values.postQuote} text="문구를 입력해주세요." />
          <Input
            name="postQuote"
            placeholder="문구를 입력해주세요"
            block
            value={values.postQuote}
            onChange={handleChange}
            autoComplete="off"
          />
        </Section>

        <Section>
          <Label value={values.postContent} text="내용을 입력해주세요." />
          <Textarea
            name="postContent"
            placeholder="내용을 입력해주세요"
            rows={10}
            value={values.postContent}
            onChange={handleChange}
          />
        </Section>

        <Section style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SubmitButton onClick={handleSubmit}>글 작성하기</SubmitButton>
          <SubmitButton onClick={handleCancel}>취소</SubmitButton>
        </Section>
      </Form>
    </Container>
  )
}

export default NewPostForm
