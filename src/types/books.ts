export type BookStatus = 'unread' | 'in-progress' | 'done'

export interface RecommendedBook {
  _id: string
  title: string
  author: string
  imageUrl?: string | null
  totalPages: number
  recommend?: boolean
}

export interface RecommendedResponse {
  results: RecommendedBook[]
  totalPages: number
  page: number
  perPage: number
}

export interface RecommendedParams {
  page: number
  limit: number
  title?: string
  author?: string
}

export interface Reading {
  _id: string
  startPage: number
  startReading: string
  finishPage?: number
  finishReading?: string
  speed?: number
  status: 'active' | 'inactive'
}

export interface TimeLeft {
  hours: number
  minutes: number
  seconds?: number
}

export interface Book extends RecommendedBook {
  status: BookStatus
  owner?: string
  progress: Reading[]
  timeLeftToRead?: TimeLeft
}

export interface NewBook {
  title: string
  author: string
  totalPages: number
}

export interface ReadingPayload {
  id: string
  page: number
}
