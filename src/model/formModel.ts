export interface FormModel {
  picture: string | ArrayBuffer | null | FileList | File;
  name: string | undefined;
  age: number | string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  gender: string | undefined;
  acceptTerms: boolean | undefined;
  country: string | undefined;
}

export interface FormPrintModel extends FormModel {
  submitId: number;
  submitDate: string;
}
