import { api } from '@/api/api'
import type {
  Book,
  BookStatus,
  NewBook,
  ReadingPayload,
  RecommendedParams,
  RecommendedResponse,
} from '@/types/books'

export const getRecommendedBooks = async ({
  page,
  limit,
  title,
  author,
}: RecommendedParams) => {
  const { data } = await api.get<RecommendedResponse>('/books/recommend', {
    params: {
      page,
      limit,
      title: title || undefined,
      author: author || undefined,
    },
  })

  return data
}

export const addBook = async (book: NewBook) => {
  const { data } = await api.post<Book>('/books/add', book)

  return data
}

export const addRecommendedBook = async (id: string) => {
  const { data } = await api.post<Book>(`/books/add/${id}`)

  return data
}

export const getOwnBooks = async (status?: BookStatus) => {
  const { data } = await api.get<Book[]>('/books/own', { params: { status } })

  return data
}

export const getBook = async (id: string) => {
  const { data } = await api.get<Book>(`/books/${id}`)

  return data
}

export const removeBook = async (id: string) => {
  const { data } = await api.delete<{ message: string; id: string }>(
    `/books/remove/${id}`,
  )

  return data
}

export const startReading = async (payload: ReadingPayload) => {
  const { data } = await api.post<Book>('/books/reading/start', payload)

  return data
}

export const finishReading = async (payload: ReadingPayload) => {
  const { data } = await api.post<Book>('/books/reading/finish', payload)

  return data
}

export const deleteReading = async (bookId: string, readingId: string) => {
  const { data } = await api.delete<Book>('/books/reading', {
    params: { bookId, readingId },
  })

  return data
}
