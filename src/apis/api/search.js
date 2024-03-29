import { baseInstance } from '../utils/instance'

const getSearchedUserList = async (userId) => {
  try {
    const { data } = await baseInstance.get(`/search/users/${userId}`)
    return data
  } catch (error) {
    console.error(error)
  }
}

const getSearchedBookList = async (query) => {
  try {
    const { data } = await baseInstance.get(`/search/all/${query}`)
    return data
  } catch (error) {
    console.error(error)
  }
}

export { getSearchedUserList, getSearchedBookList }
