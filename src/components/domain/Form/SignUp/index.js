import SubmitButton from '../SubmitButton'
import Form from '../index'
import { Input } from '@components'
import { useForm } from '@hooks'
import { signUp } from '@apis'

const SignUp = () => {
  const { handleChange, handleSubmit } = useForm({
    initialValues: {
      email: '',
      fullName: '',
      password: '',
    },
    onSubmit: async (userInfo) => {
      await signUp(userInfo).then((res) => {
        console.log(res)
      })
    },
  })

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="text" name="email" placeholder="이메일을 입력해주세요" onChange={handleChange} />
      <Input
        type="text"
        name="fullName"
        placeholder="닉네임을 입력해주세요"
        onChange={handleChange}
      />
      <Input
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={handleChange}
      />
      <Input
        type="password"
        name="passwordConfirm"
        placeholder="비밀번호를 다시 입력해주세요"
        onChange={handleChange}
      />
      <SubmitButton>회원가입</SubmitButton>
    </Form>
  )
}

export default SignUp
