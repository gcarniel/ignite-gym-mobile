import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from '@storage/storage-auth-token'
import { AppError } from '@utils/app-error'
import axios, { AxiosInstance, AxiosError } from 'axios'

type SignOut = () => void
type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

type PromiseType = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

let failedQueue: PromiseType[] = []
let isRefreshing = false

const api = axios.create({
  baseURL: 'http://127.0.0.1:3333',
}) as APIInstanceProps
api.registerInterceptTokenManager = (singOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError.response?.status === 401) {
        if (
          requestError.response.data?.message === 'token.expired' ||
          requestError.response.data?.message === 'token.invalid'
        ) {
          const { refreshToken } = await storageAuthTokenGet()

          if (!refreshToken) {
            singOut()
            return Promise.reject(requestError)
          }

          const originalRequestConfig = requestError.config

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {
                    Authorization: `Bearer ${token}`,
                  }
                  resolve(api(originalRequestConfig))
                },
                onFailure: (error: AxiosError) => reject(error),
              })
            })
          }

          isRefreshing = true

          // eslint-disable-next-line no-async-promise-executor
          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post('/sessions/refresh-token', {
                refresh_token: refreshToken,
              })

              await storageAuthTokenSave({
                token: data.token,
                refreshToken: data.refresh_token,
              })

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data,
                )
              }
              originalRequestConfig.headers = {
                Authorization: `Bearer ${data.token}`,
              }
              api.defaults.headers.common.Authorization = `Bearer ${data.token}`

              failedQueue.forEach((request) => {
                request.onSuccess(data.token)
              })
              resolve(api(originalRequestConfig))

              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
              failedQueue.forEach((request) => request.onFailure(error))
              singOut()
              reject(error)
            } finally {
              isRefreshing = false
              failedQueue = []
            }
          })
        }

        singOut()
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message))
      } else {
        return Promise.reject(requestError)
      }
    },
  )
  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }
