//import { Gender } from './gender.enum';

// export interface FormModel {
//   name: string;
//   age: number;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   gender: Gender;
//   acceptTerms: boolean;
//   picture: string;
//   country: string;
// }

export interface FormModel {
  picture: string | ArrayBuffer | null;
  name: string | undefined;
  age: number | string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  gender: string | undefined;
  acceptTerms: boolean | undefined;
  country: string | undefined;
}
