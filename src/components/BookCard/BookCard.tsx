import css from './BookCard.module.css'

interface BookCardProps {
  title: string
  author: string
  imageUrl?: string | null
  onClick?: () => void
}

function BookCard({ title, author, imageUrl, onClick }: BookCardProps) {
  return (
    <div className={css.card}>
      <button
        type="button"
        className={css.cover}
        onClick={onClick}
        aria-label={`Open ${title}`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className={css.image}
          />
        ) : (
          <svg className={css.placeholder} aria-hidden="true">
            <use href="/sprite.svg#icon-book" />
          </svg>
        )}
      </button>
      <h3 className={css.title} title={title}>
        {title}
      </h3>
      <p className={css.author} title={author}>
        {author}
      </p>
    </div>
  )
}

export default BookCard
