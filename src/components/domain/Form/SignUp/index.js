import SubmitButton from '../SubmitButton'
import ErrorText from '../ErrorText'
import Form from '../index'
import { Input } from '@components'
import { signUp } from '@apis'
import { validateSignUp } from '@utils/validation/signUp'
import { useFormik } from 'formik'

const SignUp = () => {
  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: '',
      fullName: '',
      password: '',
      passwordConfirm: '',
    },
    onSubmit: async ({ email, fullName, password }) => {
      const userInfo = {
        email,
        fullName,
        password,
      }
      const { user, token } = await signUp(userInfo)
      // TODO
      // 바로 Login 적용하여 토큰 localStorage에 적용시키고
      // userContext에 연결
      // 회원가입 성공 시 로그인 후 main 이동
    },
    validate: validateSignUp,
  })

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="email"
        name="email"
        placeholder="이메일을 입력해주세요"
        onChange={handleChange}
        value={values.email}
      />
      {errors.email && <ErrorText> {errors.email}</ErrorText>}
      <Input
        type="text"
        name="fullName"
        placeholder="닉네임을 입력해주세요"
        onChange={handleChange}
        value={values.fullName}
      />
      {errors.fullName && <ErrorText> {errors.fullName}</ErrorText>}
      <Input
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={handleChange}
        value={values.password}
      />
      {errors.password && <ErrorText> {errors.password}</ErrorText>}
      <Input
        type="password"
        name="passwordConfirm"
        placeholder="비밀번호를 다시 입력해주세요"
        onChange={handleChange}
        value={values.passwordConfirm}
      />
      {errors.passwordConfirm && <ErrorText> {errors.passwordConfirm}</ErrorText>}
      <SubmitButton>회원가입</SubmitButton>
    </Form>
  )
}

export default SignUp
