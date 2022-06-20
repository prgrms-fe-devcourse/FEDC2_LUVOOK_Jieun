import { baseInstance, authInstance } from '../utils/instance'

const getUserInfo = async (userId) => {
  try {
    const { data } = await baseInstance.get(`/users/${userId}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

const updateUserProfileImg = async (imageInfo) => {
  try {
    const { data } = await authInstance.post(`/users/upload-photo`, imageInfo)
    return data
  } catch (error) {
    console.error(error)
  }
}

const updateUserName = async (userName) => {
  try {
    const { data } = await authInstance.put(`/settings/update-user`, userName)
    return data
  } catch (error) {
    console.error(error)
  }
}

const updateUserPassword = async (userPassword) => {
  try {
    const { data } = await authInstance.put(`/settings/update-password`, userPassword)
    return data
  } catch (error) {
    console.error(error)
  }
}

export { getUserInfo, updateUserProfileImg, updateUserName, updateUserPassword }
