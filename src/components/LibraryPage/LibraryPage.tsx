import { useState } from 'react'
import AddBook from '@/components/AddBook/AddBook'
import Dashboard from '@/components/Dashboard/Dashboard'
import MyLibraryBooks from '@/components/MyLibraryBooks/MyLibraryBooks'
import RecommendedPreview from '@/components/RecommendedPreview/RecommendedPreview'

function LibraryPage() {
  const [reloadKey, setReloadKey] = useState(0)
  const reload = () => setReloadKey((prev) => prev + 1)

  return (
    <main className="container workspace">
      <Dashboard>
        <AddBook onAdded={reload} />
        <RecommendedPreview onAdded={reload} />
      </Dashboard>
      <MyLibraryBooks reloadKey={reloadKey} />
    </main>
  )
}

export default LibraryPage
