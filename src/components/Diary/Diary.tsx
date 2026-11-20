import type { Book } from '@/types/books'
import { getMinutesBetween, getPercent } from '@/utils/format'
import { getFinishedReadings, getPagesRead, groupByDate } from '@/utils/reading'
import css from './Diary.module.css'

interface DiaryProps {
  book: Book
  onDelete: (readingId: string) => void
}

function Diary({ book, onDelete }: DiaryProps) {
  const groups = groupByDate(getFinishedReadings(book))

  return (
    <ul className={css.list}>
      {groups.map((group, index) => (
        <li key={group.date} className={index === 0 ? css.current : css.group}>
          <div className={css.head}>
            <span className={css.marker} aria-hidden="true" />
            <span className={css.date}>{group.date}</span>
            <span className={css.total}>{group.pages} pages</span>
          </div>

          <ul className={css.items}>
            {group.items.map((reading) => (
              <li key={reading._id} className={css.item}>
                <div className={css.info}>
                  <p className={css.percent}>
                    {getPercent(getPagesRead(reading), book.totalPages)}%
                  </p>
                  <p className={css.minutes}>
                    {getMinutesBetween(
                      reading.startReading,
                      reading.finishReading ?? reading.startReading,
                    )}{' '}
                    minutes
                  </p>
                </div>

                <div className={css.speed}>
                  <div className={css.row}>
                    <svg
                      className={css.chart}
                      viewBox="0 0 60 26"
                      aria-hidden="true"
                    >
                      <polygon
                        points="0,26 0,18 60,6 60,26"
                        className={css.fill}
                      />
                      <polyline points="0,18 60,6" className={css.line} />
                    </svg>
                    <button
                      type="button"
                      className={css.delete}
                      onClick={() => onDelete(reading._id)}
                      aria-label={`Delete reading from ${group.date}`}
                    >
                      <svg className={css.icon} aria-hidden="true">
                        <use href="/sprite.svg#icon-trash" />
                      </svg>
                    </button>
                  </div>
                  <p className={css.perHour}>
                    {reading.speed ?? 0} pages per hour
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default Diary
