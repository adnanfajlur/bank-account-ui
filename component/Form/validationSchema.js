/* eslint-disable newline-per-chained-call */
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  type: Yup.string().required('Please enter type'),
  companyName: Yup.string().min(4).max(32).required('Please enter companyName').when('type', {
    is: 'company',
    otherwise: () => Yup.string(),
  }),
  firstName: Yup.string().min(2).max(32).required('Please enter firstName').when('type', {
    is: 'individual',
    otherwise: () => Yup.string(),
  }),
  lastName: Yup.string(),
  accountHolderName: Yup.string().min(2).max(32).required('Please enter accountHolderName'),
  accountNumber: Yup.string().min(4).max(32).required('Please enter accountNumber'),
  swiftCode: Yup.string().required('Please enter swiftCode'),
  address: Yup.string().min(6).max(100).required('Please enter address'),
  city: Yup.string().min(2).max(32).required('Please enter city'),
  country: Yup.string().min(2).max(32).required('Please enter country'),
  currency: Yup.string().required('Please enter currency'),
})

export default validationSchema
