import { Title, Button, Avatar, Text } from '@components'
import { useUserContext, UserContextProvider } from '@contexts/UserContext'

export default {
  title: 'Contexts/UserContext',
}

const loginInfo = {
  email: '',
  password: '',
}

const App = () => {
  return (
    <UserContextProvider>
      <Title level={1}>UserContext 사용 예시</Title>
      <Pages />
    </UserContextProvider>
  )
}

const Pages = () => {
  const { currentUserState, isAuth, onAuth, onLogin, onLogout } = useUserContext()

  return (
    <div>
      <Button onClick={() => onLogin(loginInfo)}>로그인 버튼</Button>
      <Button onClick={() => onLogout()}>로그아웃 버튼</Button>

      {currentUserState.isLoading && <Text>로딩중...</Text>}

      {isAuth && (
        <div>
          <Title level={2}>로그인 인증 완료</Title>
          <div>
            <Avatar src={currentUserState.currentUser.image} />
            <Title level={2}>{currentUserState.currentUser.fullName}</Title>
            <Title level={3}>{currentUserState.currentUser.fullName}의 문구</Title>
            <Text size="normal">{currentUserState.currentUser.role.quote}</Text>
          </div>
        </div>
      )}
    </div>
  )
}

export const Default = () => {
  return <App />
}
