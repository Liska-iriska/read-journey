import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import {
  loginUser,
  logoutUser,
  registerUser,
  restoreSession,
} from '@/services/auth'
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from '@/types/auth'
import { loadSession, saveSession } from '@/utils/session'
import { AuthContext } from './auth-context'

interface AuthProviderProps {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<AuthResponse | null>(loadSession)
  const [isRefreshing, setIsRefreshing] = useState(session !== null)

  useEffect(() => {
    const stored = loadSession()
    if (!stored) return

    restoreSession(stored)
      .then((next) => {
        saveSession(next)
        setSession(next)
      })
      .catch(() => {
        saveSession(null)
        setSession(null)
      })
      .finally(() => setIsRefreshing(false))
  }, [])

  const startSession = (next: AuthResponse) => {
    saveSession(next)
    setSession(next)
  }

  const register = async (credentials: RegisterCredentials) => {
    startSession(await registerUser(credentials))
  }

  const logIn = async (credentials: LoginCredentials) => {
    startSession(await loginUser(credentials))
  }

  const logOut = async () => {
    try {
      await logoutUser()
    } finally {
      saveSession(null)
      setSession(null)
    }
  }

  const user = session ? { name: session.name, email: session.email } : null

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: session !== null,
        isRefreshing,
        register,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
