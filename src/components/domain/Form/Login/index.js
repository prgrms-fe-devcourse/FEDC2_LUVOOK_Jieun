import SubmitButton from '../SubmitButton'
import Form from '../index'
import { Input } from '@components'
import { useForm } from '@hooks'
import { login, getCleanUserInfo } from '@apis'

const Login = () => {
  const { handleChange, handleSubmit } = useForm({
    initialValue: {
      email: '',
      password: '',
    },
    onSubmit: async (userInfo) => {
      await login(userInfo)
        .then(getCleanUserInfo)
        .then((res) => console.log(res))
    },
  })

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="text" name="email" placeholder="이메일을 입력해주세요" onChange={handleChange} />
      <Input
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={handleChange}
      />
      <SubmitButton>로그인</SubmitButton>
    </Form>
  )
}

export default Login
