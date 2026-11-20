import type { ReactNode } from 'react'
import css from './Panel.module.css'

interface PanelProps {
  title: string
  aside?: ReactNode
  children: ReactNode
}

function Panel({ title, aside, children }: PanelProps) {
  return (
    <section className={css.panel}>
      <div className={css.header}>
        <h1 className={css.title}>{title}</h1>
        {aside}
      </div>
      {children}
    </section>
  )
}

export default Panel
