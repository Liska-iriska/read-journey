import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getErrorMessage } from '@/utils/getErrorMessage'

interface State<T> {
  source: unknown
  data: T | null
}

export function useFetch<T>(load: () => Promise<T>) {
  const [state, setState] = useState<State<T>>({ source: null, data: null })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let ignore = false

    load()
      .then((data) => {
        if (!ignore) setState({ source: load, data })
      })
      .catch((error) => {
        if (ignore) return
        toast.error(getErrorMessage(error))
        setState({ source: load, data: null })
      })

    return () => {
      ignore = true
    }
  }, [load, attempt])

  return {
    data: state.data,
    isLoading: state.source !== load,
    reload: () => setAttempt((prev) => prev + 1),
    mutate: (update: (prev: T | null) => T | null) =>
      setState((prev) => ({ ...prev, data: update(prev.data) })),
  }
}
