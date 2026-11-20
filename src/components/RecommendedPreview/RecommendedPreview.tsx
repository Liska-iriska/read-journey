import { useState } from 'react'
import { Link } from 'react-router-dom'
import AddToLibraryModal from '@/components/AddToLibraryModal/AddToLibraryModal'
import BookCard from '@/components/BookCard/BookCard'
import { useRecommendedBooks } from '@/hooks/useRecommendedBooks'
import type { RecommendedBook } from '@/types/books'
import css from './RecommendedPreview.module.css'

interface RecommendedPreviewProps {
  onAdded: () => void
}

function RecommendedPreview({ onAdded }: RecommendedPreviewProps) {
  const [selected, setSelected] = useState<RecommendedBook | null>(null)
  const { books } = useRecommendedBooks({ page: 1, limit: 3 })

  return (
    <div className={css.preview}>
      <h2 className={css.title}>Recommended books</h2>

      <ul className={css.list}>
        {books.map((book) => (
          <li key={book._id}>
            <BookCard
              compact
              title={book.title}
              author={book.author}
              imageUrl={book.imageUrl}
              onClick={() => setSelected(book)}
            />
          </li>
        ))}
      </ul>

      <Link to="/recommended" className={css.link}>
        <span className={css.linkText}>Home</span>
        <svg className={css.icon} aria-hidden="true">
          <use href="/sprite.svg#icon-arrow-right" />
        </svg>
      </Link>

      <AddToLibraryModal
        book={selected}
        onClose={() => setSelected(null)}
        onAdded={onAdded}
      />
    </div>
  )
}

export default RecommendedPreview
