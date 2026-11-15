import axios from 'axios'
import { loadSession } from '@/utils/session'

export const api = axios.create({
  baseURL: 'https://readjourney.b.goit.study/api',
})

api.interceptors.request.use((config) => {
  const token = loadSession()?.token

  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
