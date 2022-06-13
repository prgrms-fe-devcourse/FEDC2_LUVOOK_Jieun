import { baseInstance, authInstance } from '../utils/instance'

const getUserInfo = async (userId) => {
  try {
    await baseInstance.get(`/user/${userId}`)
  } catch (error) {
    console.log(error)
  }
}

const updateUserProfileImg = async (imageInfo) => {
  try {
    await authInstance.post(`/user/upload-photo`, imageInfo)
  } catch (error) {
    console.error(error)
  }
}

const updateUserName = async (userName) => {
  try {
    await authInstance.put(`/user/update-user`, userName)
  } catch (error) {
    console.error(error)
  }
}

const updateUserPassword = async (userPassword) => {
  try {
    await authInstance.put(`/user/update-password`, userPassword)
  } catch (error) {
    console.error(error)
  }
}

export { getUserInfo, updateUserProfileImg, updateUserName, updateUserPassword }
