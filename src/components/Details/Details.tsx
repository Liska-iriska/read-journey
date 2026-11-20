import { useState } from 'react'
import Diary from '@/components/Diary/Diary'
import Statistics from '@/components/Statistics/Statistics'
import type { Book } from '@/types/books'
import { getFinishedReadings } from '@/utils/reading'
import css from './Details.module.css'

interface DetailsProps {
  book: Book
  onDeleteReading: (readingId: string) => void
}

type View = 'diary' | 'statistics'

const views: { value: View; label: string; icon: string }[] = [
  { value: 'diary', label: 'Diary', icon: 'icon-hourglass' },
  { value: 'statistics', label: 'Statistics', icon: 'icon-pie-chart' },
]

function Details({ book, onDeleteReading }: DetailsProps) {
  const [view, setView] = useState<View>('diary')

  if (getFinishedReadings(book).length === 0) {
    return (
      <div className={css.details}>
        <h2 className={css.title}>Progress</h2>
        <p className={css.text}>
          Here you will see when and how much you read. To record, click on the
          red button above.
        </p>
        <span className={css.star} aria-hidden="true">
          🌟
        </span>
      </div>
    )
  }

  return (
    <div className={css.details}>
      <div className={css.header}>
        <h2 className={css.title}>
          {view === 'diary' ? 'Diary' : 'Statistics'}
        </h2>
        <div className={css.switch}>
          {views.map(({ value, label, icon }) => (
            <button
              key={value}
              type="button"
              className={`${css.toggle} ${view === value ? css.active : ''}`}
              onClick={() => setView(value)}
              aria-pressed={view === value}
              aria-label={label}
            >
              <svg className={css.icon} aria-hidden="true">
                <use href={`/sprite.svg#${icon}`} />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {view === 'diary' ? (
        <Diary book={book} onDelete={onDeleteReading} />
      ) : (
        <Statistics book={book} />
      )}
    </div>
  )
}

export default Details
