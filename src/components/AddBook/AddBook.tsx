import { useState } from 'react'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import Button from '@/components/Button/Button'
import InfoModal from '@/components/InfoModal/InfoModal'
import Input from '@/components/Input/Input'
import { addBook } from '@/services/books'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { addBookSchema } from '@/utils/validation'
import css from './AddBook.module.css'

interface AddBookProps {
  onAdded: () => void
}

function AddBook({ onAdded }: AddBookProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { getFieldProps, handleSubmit, touched, errors, isSubmitting } =
    useFormik({
      initialValues: { title: '', author: '', totalPages: '' },
      validationSchema: addBookSchema,
      onSubmit: async (values, { resetForm }) => {
        try {
          await addBook({
            title: values.title.trim(),
            author: values.author.trim(),
            totalPages: Number(values.totalPages),
          })
          resetForm()
          setIsModalOpen(true)
          onAdded()
        } catch (error) {
          toast.error(getErrorMessage(error))
        }
      },
    })

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit} noValidate>
        <h2 className={css.heading}>Create your library:</h2>
        <div className={css.fields}>
          <Input
            label="Book title:"
            placeholder="Enter text"
            {...getFieldProps('title')}
            error={touched.title ? errors.title : undefined}
          />
          <Input
            label="The author:"
            placeholder="Enter text"
            {...getFieldProps('author')}
            error={touched.author ? errors.author : undefined}
          />
          <Input
            label="Number of pages:"
            placeholder="0"
            inputMode="numeric"
            {...getFieldProps('totalPages')}
            error={touched.totalPages ? errors.totalPages : undefined}
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          Add book
        </Button>
      </form>

      <InfoModal
        isOpen={isModalOpen}
        emoji="👍"
        title="Good job"
        onClose={() => setIsModalOpen(false)}
      >
        Your book is now in <mark>the library!</mark> The joy knows no bounds
        and now you can start your training
      </InfoModal>
    </>
  )
}

export default AddBook
