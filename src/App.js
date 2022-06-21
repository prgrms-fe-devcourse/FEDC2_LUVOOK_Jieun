import UserContextProvider from '@contexts/UserContext'
import './constants/css/index.css'
import AppRouter from '@routes'

function App() {
  return (
    <UserContextProvider>
      <AppRouter />
    </UserContextProvider>
  )
}

export default App
