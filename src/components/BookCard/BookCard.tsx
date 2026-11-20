import css from './BookCard.module.css'

interface BookCardProps {
  title: string
  author: string
  imageUrl?: string | null
  compact?: boolean
  onClick?: () => void
  onDelete?: () => void
}

function BookCard({
  title,
  author,
  imageUrl,
  compact = false,
  onClick,
  onDelete,
}: BookCardProps) {
  return (
    <div className={`${css.card} ${compact ? css.compact : ''}`}>
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

      <div className={css.footer}>
        <div className={css.text}>
          <h3 className={css.title} title={title}>
            {title}
          </h3>
          <p className={css.author} title={author}>
            {author}
          </p>
        </div>

        {onDelete && (
          <button
            type="button"
            className={css.delete}
            onClick={onDelete}
            aria-label={`Remove ${title} from library`}
          >
            <svg className={css.deleteIcon} aria-hidden="true">
              <use href="/sprite.svg#icon-trash" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default BookCard
