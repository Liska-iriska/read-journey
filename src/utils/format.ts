export function formatDate(iso: string): string {
  const date = new Date(iso)
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')

  return `${dd}.${mm}.${date.getFullYear()}`
}

export function getMinutesBetween(start: string, end: string): number {
  const diff = new Date(end).getTime() - new Date(start).getTime()

  return Math.max(0, Math.round(diff / 60000))
}

export function getPercent(part: number, total: number): number {
  if (total <= 0) return 0

  return Math.min(100, Math.round((part / total) * 10000) / 100)
}
