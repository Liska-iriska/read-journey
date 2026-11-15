import type { AuthResponse } from '@/types/auth'

const STORAGE_KEY = 'read-journey-session'

export function loadSession(): AuthResponse | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthResponse) : null
  } catch {
    return null
  }
}

export function saveSession(session: AuthResponse | null) {
  try {
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    return
  }
}
