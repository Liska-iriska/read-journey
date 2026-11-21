import { useSyncExternalStore } from 'react'

const TABLET = '(min-width: 768px)'
const DESKTOP = '(min-width: 1280px)'

function subscribe(callback: () => void) {
  const queries = [TABLET, DESKTOP].map((query) => window.matchMedia(query))
  queries.forEach((media) => media.addEventListener('change', callback))

  return () =>
    queries.forEach((media) => media.removeEventListener('change', callback))
}

function getSnapshot() {
  if (window.matchMedia(DESKTOP).matches) return 10
  if (window.matchMedia(TABLET).matches) return 8
  return 2
}

/** Books per page: 2 on mobile, 8 on tablet, 10 on desktop. */
export function usePageLimit() {
  return useSyncExternalStore(subscribe, getSnapshot, () => 10)
}
