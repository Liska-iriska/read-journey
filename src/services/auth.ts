import { api } from '@/api/api'
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  Tokens,
  User,
} from '@/types/auth'

export const registerUser = async (credentials: RegisterCredentials) => {
  const { data } = await api.post<AuthResponse>('/users/signup', credentials)
  return data
}

export const loginUser = async (credentials: LoginCredentials) => {
  const { data } = await api.post<AuthResponse>('/users/signin', credentials)
  return data
}

export const logoutUser = () => api.post('/users/signout')

export async function restoreSession(
  session: AuthResponse,
): Promise<AuthResponse> {
  try {
    const { data } = await api.get<User>('/users/current')
    return { ...session, name: data.name, email: data.email }
  } catch {
    const { data: tokens } = await api.get<Tokens>('/users/current/refresh', {
      headers: { Authorization: `Bearer ${session.refreshToken}` },
    })
    const { data } = await api.get<User>('/users/current', {
      headers: { Authorization: `Bearer ${tokens.token}` },
    })
    return { name: data.name, email: data.email, ...tokens }
  }
}
