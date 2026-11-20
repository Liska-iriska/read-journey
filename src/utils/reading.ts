import type { Book, Reading } from '@/types/books'
import { formatDate } from '@/utils/format'

export function getActiveReading(book: Book): Reading | undefined {
  return book.progress.find((item) => item.status === 'active')
}

/** Завершені сесії читання, від нових до старих. */
export function getFinishedReadings(book: Book): Reading[] {
  return book.progress
    .filter((item) => item.finishPage !== undefined && item.finishReading)
    .sort(
      (a, b) =>
        new Date(b.startReading).getTime() - new Date(a.startReading).getTime(),
    )
}

/** Прочитано за сесію (першу і останню сторінку включно). */
export function getPagesRead(reading: Reading): number {
  if (reading.finishPage === undefined) return 0

  return Math.max(0, reading.finishPage - reading.startPage + 1)
}

export function getTotalPagesRead(book: Book): number {
  const total = getFinishedReadings(book).reduce(
    (sum, reading) => sum + getPagesRead(reading),
    0,
  )

  return Math.min(total, book.totalPages)
}

export interface ReadingGroup {
  date: string
  pages: number
  items: Reading[]
}

/** Групує завершені сесії за датою (dd.mm.yyyy). */
export function groupByDate(readings: Reading[]): ReadingGroup[] {
  const groups: ReadingGroup[] = []

  for (const reading of readings) {
    const date = formatDate(reading.startReading)
    let group = groups.find((item) => item.date === date)

    if (!group) {
      group = { date, pages: 0, items: [] }
      groups.push(group)
    }

    group.pages += getPagesRead(reading)
    group.items.push(reading)
  }

  return groups
}
