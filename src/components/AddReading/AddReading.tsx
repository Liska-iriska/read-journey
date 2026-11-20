import { useState } from 'react'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import Button from '@/components/Button/Button'
import InfoModal from '@/components/InfoModal/InfoModal'
import Input from '@/components/Input/Input'
import { finishReading, startReading } from '@/services/books'
import type { Book } from '@/types/books'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { getActiveReading } from '@/utils/reading'
import { createPageSchema } from '@/utils/validation'
import css from './AddReading.module.css'

interface AddReadingProps {
  book: Book
  onChange: () => void
}

function AddReading({ book, onChange }: AddReadingProps) {
  const [isFinishedOpen, setIsFinishedOpen] = useState(false)

  const active = getActiveReading(book)
  const isReading = active !== undefined

  const { getFieldProps, handleSubmit, touched, errors, isSubmitting } =
    useFormik({
      initialValues: { page: '' },
      validationSchema: createPageSchema(
        isReading ? active.startPage : 1,
        book.totalPages,
      ),
      onSubmit: async ({ page }, { resetForm }) => {
        const payload = { id: book._id, page: Number(page) }

        try {
          if (isReading) {
            await finishReading(payload)
            if (payload.page === book.totalPages) setIsFinishedOpen(true)
          } else {
            await startReading(payload)
          }
          resetForm()
          onChange()
        } catch (error) {
          toast.error(getErrorMessage(error))
        }
      },
    })

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit} noValidate>
        <h2 className={css.heading}>
          {isReading ? 'Stop page:' : 'Start page:'}
        </h2>
        <Input
          label="Page number:"
          placeholder="0"
          inputMode="numeric"
          {...getFieldProps('page')}
          error={touched.page ? errors.page : undefined}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isReading ? 'To stop' : 'To start'}
        </Button>
      </form>

      <InfoModal
        isOpen={isFinishedOpen}
        emoji="📚"
        title="The book is read"
        onClose={() => setIsFinishedOpen(false)}
      >
        It was an <mark>exciting journey</mark>, where each page revealed new
        horizons, and the characters became inseparable friends.
      </InfoModal>
    </>
  )
}

export default AddReading
