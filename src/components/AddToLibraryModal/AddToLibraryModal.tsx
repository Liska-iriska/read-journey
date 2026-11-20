import { useState } from 'react'
import toast from 'react-hot-toast'
import BookModal from '@/components/BookModal/BookModal'
import InfoModal from '@/components/InfoModal/InfoModal'
import { addRecommendedBook } from '@/services/books'
import type { RecommendedBook } from '@/types/books'
import { getErrorMessage } from '@/utils/getErrorMessage'

interface AddToLibraryModalProps {
  book: RecommendedBook | null
  onClose: () => void
  onAdded?: () => void
}

function AddToLibraryModal({ book, onClose, onAdded }: AddToLibraryModalProps) {
  const [isPending, setIsPending] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const handleAdd = async (selected: RecommendedBook) => {
    setIsPending(true)
    try {
      await addRecommendedBook(selected._id)
      onClose()
      setIsAdded(true)
      onAdded?.()
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsPending(false)
    }
  }

  return (
    <>
      <BookModal
        book={book}
        actionLabel="Add to library"
        isPending={isPending}
        onAction={handleAdd}
        onClose={onClose}
      />
      <InfoModal
        isOpen={isAdded}
        emoji="👍"
        title="Good job"
        onClose={() => setIsAdded(false)}
      >
        Your book is now in <mark>the library!</mark> The joy knows no bounds
        and now you can start your training
      </InfoModal>
    </>
  )
}

export default AddToLibraryModal
