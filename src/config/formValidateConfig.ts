import { object, string, number, ref, boolean, mixed, InferType } from 'yup';
import { countries } from '../constantes/countries';

export const schema = object().shape({
  name: string()
    .required('Name is required')
    .matches(
      /^[\p{Lu}\p{Lt}].*$/u,
      'Name should start with an uppercased letter'
    )
    .test('empty', 'Name is required', (value) => value !== ''),
  age: number()
    .required('Age is required')
    .typeError('Age is required')
    .positive('Age should be positive')
    .integer('Age should be an integer'),
  email: string()
    .required('Email is required')
    .email('Email should be a valid email address'),
  password: string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z\u0430-\u044F])(?=.*[A-Z\u0410-\u042F])(?=.*[!@#$%^&*]).{4,}$/,
      'Password should have 1 number, 1 uppercased letter, 1 lowercased letter and 1 special character'
    )
    .test('empty', 'Password is required', (value) => value !== ''),
  confirmPassword: string()
    .required('Confirm password is required')
    .oneOf([ref('password')], 'Passwords should match'),
  gender: string().required('Gender is required'),
  acceptTerms: boolean()
    .required('You must accept the terms and conditions')
    .oneOf([true], 'You must accept the terms and conditions'),
  picture: mixed<File>()
    .required('Picture is required')
    .test('fileSize', 'Picture size should be less than 1 MB', (value) => {
      if (value instanceof File) {
        return value && value.size <= 1048576;
      }
    })
    .test('fileType', 'Picture should be a png or jpeg file', (value) => {
      if (value instanceof File) {
        return value && ['image/png', 'image/jpeg'].includes(value.type);
      }
    }),
  country: string()
    .required('Country is required')
    .oneOf(['', ...countries], 'Such country does not exist')
    .test('empty', 'Country is required', (value) => value !== ''),
});

type Data = InferType<typeof schema>;

export type ErrorsForm = Partial<Record<keyof Data, string>>;
