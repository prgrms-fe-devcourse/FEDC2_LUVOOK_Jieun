import SubmitButton from '../SubmitButton'
import Form from '../index'
import { Input } from '@components'
import { login, getCleanUserInfo } from '@apis'
import { useFormik } from 'formik'

const Login = () => {
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (userInfo) => {
      const { user, token } = await login(userInfo)
      const cleanUserInfo = getCleanUserInfo(user)
      // TODO
      // cleanUserInfo userContext 유저에 적용하기
      // token, localStorage에 적용
      // 로그인 성공 시 main 이동
    },
  })

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="email"
        placeholder="이메일을 입력해주세요"
        onChange={handleChange}
        value={values.email}
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
