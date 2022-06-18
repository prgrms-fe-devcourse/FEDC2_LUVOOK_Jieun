import SubmitButton from '../SubmitButton'
import ErrorText from '../ErrorText'
import Form from '../index'
import { Input } from '@components'
import { signUp } from '@apis'
import { validateSignUp } from '@utils/validation/signUp'
import { useFormik } from 'formik'
import { useUserContext } from '@contexts/UserContext'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const { onSignUp } = useUserContext()
  const navigate = useNavigate()

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
      try {
        await onSignUp(userInfo)
        navigate('/')
      } catch (e) {
        alert('회원가입에 실패하였습니다.')
      }
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
