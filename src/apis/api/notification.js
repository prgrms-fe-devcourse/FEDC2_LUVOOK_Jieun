import { authInstance } from '../utils/instance'

const getNotificationList = async () => {
  try {
    await authInstance.get(`/notifications`)
  } catch (error) {
    console.error(error)
  }
}

const createNotification = async (notification) => {
  try {
    await authInstance.post(`/notifications/create`, notification)
  } catch (error) {
    console.error(error)
  }
}

const checkSeenNotification = async () => {
  try {
    await authInstance.get(`/notifications/seen`)
  } catch (error) {
    console.error(error)
  }
}

export { getNotificationList, createNotification, checkSeenNotification }
