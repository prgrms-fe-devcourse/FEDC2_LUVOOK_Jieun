import SubmitButton from '../SubmitButton'
import Form from '../index'
import { Input } from '@components'
import { useUserContext } from '@contexts/UserContext'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { onLogin } = useUserContext()
  const navigate = useNavigate()

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (userInfo) => {
      try {
        await onLogin(userInfo)
        navigate('/')
      } catch (e) {
        alert('로그인에 실패하였습니다.')
      }
    },
  })

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="email"
        name="email"
        placeholder="이메일을 입력해주세요"
        onChange={handleChange}
        value={values.email}
        style={{ marginBottom: 10 }}
      />
      <Input
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={handleChange}
        value={values.password}
      />
      <SubmitButton>로그인</SubmitButton>
    </Form>
  )
}

export default Login
