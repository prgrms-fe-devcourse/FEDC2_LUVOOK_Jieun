const validateSignUp = ({ email, fullName, password, passwordConfirm }) => {
  const errors = {}

  if (email && !/^[A-Z0-9._%+-]+@[A-Z0-s9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = '이메일 형식이 아닙니다.'
  }

  if ((fullName && fullName.length < 2) || fullName.length > 15) {
    errors.fullName = '닉네임을 입력해주세요(2~15자)'
  }

  if ((password && password.length < 8) || password.length > 15) {
    errors.password = '비밀번호를 입력해 주세요(8~15자)'
  }

  if (passwordConfirm && password !== passwordConfirm) {
    errors.passwordConfirm = '비밀번호가 일치하지 않습니다'
  }

  return errors
}

export { validateSignUp }
