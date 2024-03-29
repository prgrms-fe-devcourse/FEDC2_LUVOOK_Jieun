import { Route, Routes } from 'react-router'
import { LoginPage, MainPage, NotFoundPage, SignUpPage, UsersPage } from '@pages'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />
      <Route path="/users/:userId" element={<UsersPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter
