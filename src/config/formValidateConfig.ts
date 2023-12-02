import { object, string, number, ref, boolean, mixed, InferType } from 'yup';
import { countries } from '../constantes/countries';

export const schema = object().shape({
  name: string()
    .required('Name is required')
    .matches(/^[A-Z][a-z]*$/, 'Name should start with an uppercased letter'),
  age: number()
    .required('Age is required')
    .positive('Age should be positive')
    .integer('Age should be an integer'),
  email: string()
    .required('Email is required')
    .email('Email should be a valid email address'),
  password: string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
      'Password should have at least 8 characters, 1 number, 1 uppercased letter, 1 lowercased letter and 1 special character'
    ),
  confirmPassword: string()
    .required('Confirm password is required')
    .oneOf([ref('password')], 'Passwords should match'),
  gender: string().required('Gender is required'),
  acceptTerms: boolean()
    .required('You must accept the terms and conditions')
    .oneOf([true], 'You must accept the terms and conditions'),
  picture: mixed()
    .required('Picture is required')
    .test('fileSize', 'Picture size should be less than 1 MB', (value) => {
      const file = value as File;
      return file && file.size <= 1048576;
    })
    .test('fileType', 'Picture should be a png or jpeg file', (value) => {
      const file = value as File;
      return file && ['image/png', 'image/jpeg'].includes(file.type);
    }),
  country: string()
    .required('Country is required')
    .test('empty', 'Country is required', (value) => value !== '')
    .oneOf(countries, 'Such country does not exist'),
});

type Data = InferType<typeof schema>;

export type ErrorsForm = Partial<Record<keyof Data, string>>;
