import * as Yup from 'yup'

const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

const email = Yup.string()
  .matches(EMAIL_REGEX, 'Enter a valid Email*')
  .required('Enter a valid Email*')

const password = Yup.string()
  .min(7, 'Enter a valid Password*')
  .required('Enter a valid Password*')

export const registerSchema = Yup.object({
  name: Yup.string().trim().required('Enter your Name*'),
  email,
  password,
})

export const loginSchema = Yup.object({
  email,
  password,
})
