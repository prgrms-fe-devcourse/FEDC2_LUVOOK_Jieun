import { baseInstance, authInstance } from '../utils/instance'

const getChannelInfo = async (channelName) => {
  try {
    const { data } = await baseInstance.get(`/channels/${channelName}`)
    return data
  } catch (error) {
    console.error(error)
  }
}

const getChannelList = async () => {
  try {
    const { data } = await baseInstance.get(`/channels`)
    return data
  } catch (error) {
    console.error(error)
  }
}

export { getChannelInfo, getChannelList }
