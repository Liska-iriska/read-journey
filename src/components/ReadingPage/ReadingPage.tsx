import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import AddReading from '@/components/AddReading/AddReading'
import Dashboard from '@/components/Dashboard/Dashboard'
import Details from '@/components/Details/Details'
import Loader from '@/components/Loader/Loader'
import MyBook from '@/components/MyBook/MyBook'
import PageLayout from '@/components/PageLayout/PageLayout'
import { useFetch } from '@/hooks/useFetch'
import { deleteReading, getBook } from '@/services/books'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { getActiveSession } from '@/utils/reading'

interface ReadingContentProps {
  id: string
}

function ReadingContent({ id }: ReadingContentProps) {
  const load = useCallback(() => getBook(id), [id])
  const { data: book, isLoading, reload } = useFetch(load)

  if (isLoading) return <Loader />

  if (!book) {
    return (
      <p>
        The book could not be loaded. <Link to="/library">Back to library</Link>
      </p>
    )
  }

  const handleDeleteReading = async (readingId: string) => {
    try {
      await deleteReading(book._id, readingId)
      reload()
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <PageLayout
      dashboard={
        <Dashboard>
          <AddReading book={book} onChange={reload} />
          <Details book={book} onDeleteReading={handleDeleteReading} />
        </Dashboard>
      }
    >
      <MyBook book={book} isReading={getActiveSession(book) !== undefined} />
    </PageLayout>
  )
}

function ReadingPage() {
  const [params] = useSearchParams()
  const id = params.get('id')

  if (!id) return <Navigate to="/library" replace />

  return <ReadingContent id={id} />
}

export default ReadingPage
