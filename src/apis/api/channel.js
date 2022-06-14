import { baseInstance, authInstance } from '../utils/instance'

const getChannelInfo = async (channelName) => {
  try {
    await baseInstance.get(`/channels/${channelName}`)
  } catch (error) {
    console.error(error)
  }
}

const getChannelList = async () => {
  try {
    await baseInstance.get(`/channels`)
  } catch (error) {
    console.error(error)
  }
}

export { getChannelInfo, getChannelList }
