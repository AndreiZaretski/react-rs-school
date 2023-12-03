export interface FormModel {
  name: string | undefined;
  picture: string | ArrayBuffer | null | FileList | File;
  age: number | string | undefined;
  email: string | undefined;
  gender: string | undefined;
  country: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  acceptTerms: boolean | undefined;
}

export interface FormPrintModel extends FormModel {
  submitId: number;
  submitDate: string;
}
