import { baseInstance, authInstance } from '../utils/instance'

const login = async (userInfo) => {
  try {
    const { data } = await baseInstance.post(`/login`, userInfo)
    return data
  } catch (error) {
    console.error(error)
  }
}

const logout = async () => {
  try {
    await authInstance.post(`/logout`)
  } catch (error) {
    console.error(error)
  }
}

const signUp = async (userInfo) => {
  try {
    const { data } = await baseInstance.post(`/signup`, userInfo)
    return data
  } catch (error) {
    console.error(error)
  }
}

const getAuthUser = async () => {
  try {
    await authInstance.get(`/auth-user`)
  } catch (error) {
    console.error(error)
  }
}

export { login, logout, signUp, getAuthUser }
