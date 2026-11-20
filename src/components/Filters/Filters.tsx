import { useFormik } from 'formik'
import { useSearchParams } from 'react-router-dom'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import css from './Filters.module.css'

interface FiltersValues {
  title: string
  author: string
}

function Filters() {
  const [params, setParams] = useSearchParams()

  const { getFieldProps, handleSubmit } = useFormik<FiltersValues>({
    initialValues: {
      title: params.get('title') ?? '',
      author: params.get('author') ?? '',
    },
    onSubmit: ({ title, author }) => {
      const next = new URLSearchParams()
      if (title.trim()) next.set('title', title.trim())
      if (author.trim()) next.set('author', author.trim())
      setParams(next)
    },
  })

  return (
    <form className={css.form} onSubmit={handleSubmit} noValidate>
      <h2 className={css.heading}>Filters:</h2>
      <div className={css.fields}>
        <Input
          label="Book title:"
          placeholder="Enter text"
          {...getFieldProps('title')}
        />
        <Input
          label="The author:"
          placeholder="Enter text"
          {...getFieldProps('author')}
        />
      </div>
      <Button type="submit">To apply</Button>
    </form>
  )
}

export default Filters
