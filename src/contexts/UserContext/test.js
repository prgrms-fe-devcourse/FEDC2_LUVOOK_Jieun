// 동작을 테스트할 수 있는 함수와 더미데이터 입니다.

export const DUMMY_USER = {
  currentUser: {
    image: 'https://via.placeholder.com/200?text=LUVOOK', // 프로필 이미지
    role: { quote: '다람쥐 헌 쳇바퀴에 타고파' }, // 문구로 사용되는 부분
    posts: [],
    likes: [],
    comments: [],
    notifications: [],
    _id: 1234,
    fullName: '가나다랍',
    email: '123@aaa.com',
    createdAt: '2020-01-01',
    updatedAt: '2020-01-01',
  },
  isLoading: false,
}

export const handleLogin = ({ email, password }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: DUMMY_USER,
        token: '1234',
      })
    }, 1000)
  })
}

export const handleLogout = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('로그아웃 완료')
    }, 1000)
  })
}

export const handleAuth = (token) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: DUMMY_USER,
        token: '1234',
      })
    }, 1000)
  })
}
