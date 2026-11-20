import BookCard from '@/components/BookCard/BookCard'
import type { RecommendedBook } from '@/types/books'
import css from './BookList.module.css'

type BookItem = Pick<RecommendedBook, '_id' | 'title' | 'author' | 'imageUrl'>

interface BookListProps<T extends BookItem> {
  books: T[]
  onSelect: (book: T) => void
  onDelete?: (book: T) => void
}

function BookList<T extends BookItem>({
  books,
  onSelect,
  onDelete,
}: BookListProps<T>) {
  return (
    <ul className={css.list}>
      {books.map((book) => (
        <li key={book._id}>
          <BookCard
            title={book.title}
            author={book.author}
            imageUrl={book.imageUrl}
            onClick={() => onSelect(book)}
            onDelete={onDelete && (() => onDelete(book))}
          />
        </li>
      ))}
    </ul>
  )
}

export default BookList
