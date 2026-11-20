import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'
import type { RecommendedBook } from '@/types/books'
import css from './BookModal.module.css'

interface BookModalProps {
  book: RecommendedBook | null
  actionLabel: string
  isPending?: boolean
  onAction: (book: RecommendedBook) => void
  onClose: () => void
}

function BookModal({
  book,
  actionLabel,
  isPending = false,
  onAction,
  onClose,
}: BookModalProps) {
  return (
    <Modal isOpen={book !== null} onClose={onClose} size="sm">
      {book && (
        <div className={css.content}>
          <div className={css.cover}>
            {book.imageUrl ? (
              <img src={book.imageUrl} alt={book.title} className={css.image} />
            ) : (
              <svg className={css.placeholder} aria-hidden="true">
                <use href="/sprite.svg#icon-book" />
              </svg>
            )}
          </div>

          <div className={css.text}>
            <h2 className={css.title}>{book.title}</h2>
            <p className={css.author}>{book.author}</p>
            <p className={css.pages}>{book.totalPages} pages</p>
          </div>

          <Button disabled={isPending} onClick={() => onAction(book)}>
            {actionLabel}
          </Button>
        </div>
      )}
    </Modal>
  )
}

export default BookModal
