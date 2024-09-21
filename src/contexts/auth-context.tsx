import { UserDTO } from '@dtos/user-dto'
import { api } from '@services/api'
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '@storage/storage-auth-token'
import {
  storageUserRemove,
  storageUserGet,
  storageUserSave,
} from '@storage/storage-user'
import { createContext, ReactNode, useEffect, useState } from 'react'

type AuthContextProviderProps = {
  children: ReactNode
}

export type AuthContextDataProps = {
  user: UserDTO
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateUserProfile: (user: UserDTO) => Promise<void>
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoading, setIsLoading] = useState(false)

  const updateUserAndToken = async (userData: UserDTO, token: string) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    setUser(userData)
  }

  const updateUserProfile = async (userUpdated: UserDTO) => {
    setUser(userUpdated)
    await storageUserSave(userUpdated)
  }

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const { data } = await api.post('/sessions', { email, password })

      if (data.user && data.token && data.refresh_token) {
        await storageUserSave(data.user)
        await storageAuthTokenSave({
          token: data.token,
          refreshToken: data.refresh_token,
        })

        updateUserAndToken(data.user, data.token)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setIsLoading(true)
      setUser({} as UserDTO)
      await storageUserRemove()
      await storageAuthTokenRemove()
    } finally {
      setIsLoading(false)
    }
  }

  async function loadUserData() {
    try {
      setIsLoading(true)
      const userLogged = await storageUserGet()
      const { token } = await storageAuthTokenGet()

      if (userLogged && token) {
        updateUserAndToken(userLogged, token)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut)

    return () => {
      subscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signOut,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
