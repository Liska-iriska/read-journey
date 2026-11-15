import { createContext } from 'react'
import type { LoginCredentials, RegisterCredentials, User } from '@/types/auth'

export interface AuthContextValue {
  user: User | null
  isLoggedIn: boolean
  isRefreshing: boolean
  register: (credentials: RegisterCredentials) => Promise<void>
  logIn: (credentials: LoginCredentials) => Promise<void>
  logOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
