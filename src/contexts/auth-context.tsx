import { UserDTO } from '@dtos/user-dto'
import { api } from '@services/api'
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
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoading, setIsLoading] = useState(false)

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const { data } = await api.post('/sessions', { email, password })

      if (data?.user) {
        setUser(data.user)
        await storageUserSave(data.user)
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
    } finally {
      setIsLoading(false)
    }
  }

  async function loadUserData() {
    try {
      setIsLoading(true)
      const userLogged = await storageUserGet()

      if (userLogged) {
        setUser(userLogged)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
