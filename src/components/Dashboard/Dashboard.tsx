import type { ReactNode } from 'react'
import css from './Dashboard.module.css'

interface DashboardProps {
  children: ReactNode
}

function Dashboard({ children }: DashboardProps) {
  return <section className={css.dashboard}>{children}</section>
}

export default Dashboard
