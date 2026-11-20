import type { Book } from '@/types/books'
import { getPercent } from '@/utils/format'
import { getTotalPagesRead } from '@/utils/reading'
import css from './Statistics.module.css'

interface StatisticsProps {
  book: Book
}

const RADIUS = 42
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function Statistics({ book }: StatisticsProps) {
  const pagesRead = getTotalPagesRead(book)
  const percent = getPercent(pagesRead, book.totalPages)
  const offset = CIRCUMFERENCE * (1 - percent / 100)

  return (
    <>
      <p className={css.text}>
        Each page, each chapter is a new round of knowledge, a new step towards
        understanding. By rewriting statistics, we create our own reading
        history.
      </p>

      <div className={css.card}>
        <div className={css.chart}>
          <svg
            viewBox="0 0 100 100"
            className={css.svg}
            role="img"
            aria-label={`${percent}% of the book is read`}
          >
            <circle className={css.track} cx="50" cy="50" r={RADIUS} />
            <circle
              className={css.value}
              cx="50"
              cy="50"
              r={RADIUS}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
            />
          </svg>
          <span className={css.center}>100%</span>
        </div>

        <div className={css.legend}>
          <span className={css.dot} aria-hidden="true" />
          <div>
            <p className={css.percent}>{percent}%</p>
            <p className={css.pages}>{pagesRead} pages read</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Statistics
