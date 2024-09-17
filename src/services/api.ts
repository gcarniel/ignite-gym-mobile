import { AppError } from '@utils/app-error'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:3333',
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data) {
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      return Promise.reject(new AppError('Algo deu errado, tente novamente'))
    }
  },
)

export { api }
