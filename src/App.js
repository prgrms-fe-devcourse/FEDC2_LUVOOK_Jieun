import { Route, Routes } from 'react-router'
import { LoginPage, MainPage, NotFoundPage, SignUpPage, UsersPage } from '@pages'
import UserContextProvider from '@contexts/UserContext'
import './constants/css/index.css'

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route path="/users/:username" element={<UsersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App
