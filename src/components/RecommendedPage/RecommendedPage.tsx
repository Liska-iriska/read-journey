import { useState } from 'react'
import Dashboard from '@/components/Dashboard/Dashboard'
import Filters from '@/components/Filters/Filters'
import type { FiltersValues } from '@/components/Filters/Filters'
import PageLayout from '@/components/PageLayout/PageLayout'
import Quote from '@/components/Quote/Quote'
import RecommendedBooks from '@/components/RecommendedBooks/RecommendedBooks'
import Workout from '@/components/Workout/Workout'

function RecommendedPage() {
  const [filters, setFilters] = useState<FiltersValues>({
    title: '',
    author: '',
  })

  return (
    <PageLayout
      dashboard={
        <Dashboard>
          <Filters onApply={setFilters} />
          <Workout />
          <Quote />
        </Dashboard>
      }
    >
      <RecommendedBooks
        key={`${filters.title}|${filters.author}`}
        title={filters.title}
        author={filters.author}
      />
    </PageLayout>
  )
}

export default RecommendedPage
