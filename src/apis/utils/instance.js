import axios from 'axios'
import { interceptors } from './interceptors'

const { REACT_APP_BASE_URL } = process.env

const baseAPI = (url, options) => {
  return axios.create({ baseURL: url, ...options })
}

const authAPI = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options })
  interceptors(instance)
  return instance
}

export const baseInstance = baseAPI(REACT_APP_BASE_URL)
export const authInstance = authAPI(REACT_APP_BASE_URL)
