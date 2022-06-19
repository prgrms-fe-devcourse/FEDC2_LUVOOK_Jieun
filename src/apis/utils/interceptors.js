import { getItem } from '@utils/storage'

export const interceptors = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = getItem('jwt_token')

      config.headers = {
        authorization: token ? `bearer ${token}` : null,
      }
      return config
    },
    (error) => Promise.reject(error.response)
  )
  return instance
}
