import { UserDTO } from '@dtos/user-dto'
import { createContext, ReactNode, useState } from 'react'

type AuthContextProviderProps = {
  children: ReactNode
}
export type AuthContextDataProps = {
  user: UserDTO
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({
    id: '1',
    name: 'Rodrigo Gonçalves',
    email: 'rodrigo@email.com',
    avatar: 'rodrigo.png',
  })
  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
