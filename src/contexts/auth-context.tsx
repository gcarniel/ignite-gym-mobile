import { UserDTO } from '@dtos/user-dto'
import { api } from '@services/api'
import { createContext, ReactNode, useState } from 'react'

type AuthContextProviderProps = {
  children: ReactNode
}
export type AuthContextDataProps = {
  user: UserDTO
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [loading, setLoading] = useState(false)

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { data } = await api.post('/sessions', { email, password })

      if (data?.user) {
        setUser(data.user)
      }
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    setUser({} as UserDTO)
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
