import { useCallback } from 'react'
import { useFetch } from '@/hooks/useFetch'
import { getRecommendedBooks } from '@/services/books'
import type { RecommendedParams } from '@/types/books'

export function useRecommendedBooks({
  page,
  limit,
  title,
  author,
}: RecommendedParams) {
  const load = useCallback(
    () => getRecommendedBooks({ page, limit, title, author }),
    [page, limit, title, author],
  )
  const { data, isLoading } = useFetch(load)

  return {
    books: data?.results ?? [],
    totalPages: data?.totalPages ?? 1,
    isLoading,
  }
}
