import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import BookList from '@/components/BookList/BookList'
import BookModal from '@/components/BookModal/BookModal'
import Loader from '@/components/Loader/Loader'
import Panel from '@/components/Panel/Panel'
import Select from '@/components/Select/Select'
import { useFetch } from '@/hooks/useFetch'
import { getOwnBooks, removeBook } from '@/services/books'
import type { Book, BookStatus, RecommendedBook } from '@/types/books'
import { getErrorMessage } from '@/utils/getErrorMessage'
import css from './MyLibraryBooks.module.css'

const options = [
  { value: 'unread', label: 'Unread' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
  { value: 'all', label: 'All books' },
]

interface MyLibraryBooksProps {
  reloadKey: number
}

function MyLibraryBooks({ reloadKey }: MyLibraryBooksProps) {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<RecommendedBook | null>(null)

  const load = useCallback(() => {
    // reloadKey у залежностях: нове значення = повторний запит
    void reloadKey
    return getOwnBooks(filter === 'all' ? undefined : (filter as BookStatus))
  }, [filter, reloadKey])
  const { data, isLoading, mutate } = useFetch(load)

  const books = data ?? []

  const handleDelete = async (book: Book) => {
    try {
      await removeBook(book._id)
      mutate((prev) => prev?.filter((item) => item._id !== book._id) ?? null)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const handleStart = (book: RecommendedBook) => {
    setSelected(null)
    navigate(`/reading?bookId=${book._id}`)
  }

  return (
    <Panel
      title="My library"
      aside={<Select options={options} value={filter} onChange={setFilter} />}
    >
      {isLoading ? (
        <Loader />
      ) : books.length === 0 ? (
        <div className={css.empty}>
          <span className={css.emoji} aria-hidden="true">
            📚
          </span>
          <p className={css.text}>
            To start training, add <mark>some of your books</mark> or from the
            recommended ones
          </p>
        </div>
      ) : (
        <BookList
          books={books}
          onSelect={setSelected}
          onDelete={handleDelete}
        />
      )}

      <BookModal
        book={selected}
        actionLabel="Start reading"
        onAction={handleStart}
        onClose={() => setSelected(null)}
      />
    </Panel>
  )
}

export default MyLibraryBooks
