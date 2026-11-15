export interface User {
  name: string
  email: string
}

export interface Tokens {
  token: string
  refreshToken: string
}

export interface AuthResponse extends User, Tokens {}

export interface RegisterCredentials extends User {
  password: string
}

export interface LoginCredentials {
  email: string
  password: string
}
