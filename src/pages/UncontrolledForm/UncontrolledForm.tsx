import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { schema, ErrorsForm } from '../../config/formValidateConfig';
import { countries } from '../../constantes/countries';
import { ValidationError } from 'yup';
import { setFormData } from '../../redux/features/formSlice';
import ErrorValidation from '../../components/nav/errorValidation/ErrorValidation';

const UncontrolledForm = () => {
  const dispatch = useDispatch();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);
  const acceptTermsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const [country, setCountry] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(['']);
  const [errors, setErrors] = useState<ErrorsForm>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const age = ageRef.current ? +ageRef.current.value || undefined : undefined;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    const gender = maleRef.current?.checked
      ? maleRef.current.value
      : femaleRef.current?.checked
        ? femaleRef.current.value
        : undefined;
    const acceptTerms = acceptTermsRef.current?.checked;
    const picture = pictureRef.current?.files?.[0];

    const data = {
      name,
      age,
      email,
      password,
      confirmPassword,
      gender,
      acceptTerms,
      picture,
      country,
    };

    schema
      .validate(data, { abortEarly: false })
      .then(() => {
        setErrors({});

        let file: string | ArrayBuffer | null = null;
        const reader = new FileReader();
        if (picture) {
          reader.readAsDataURL(picture);
          reader.onloadend = () => {
            file = reader.result;
            const dispatchData = {
              ...data,
              picture: file,
            };
            dispatch(setFormData(dispatchData));
          };
        }
      })
      .catch((err: ValidationError) => {
        const errorObj: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (typeof error.path === 'string') {
            errorObj[error.path] = error.message;
          }
        });
        setErrors(errorObj);
      });
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCountry(value);

    const filtered = countries.filter((country) =>
      country.toLowerCase().startsWith(value.toLowerCase())
    );

    setFilteredCountries(filtered);
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" ref={nameRef} />
        <ErrorValidation error={errors.name} />
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input id="age" type="number" ref={ageRef} />
        <ErrorValidation error={errors.age} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" ref={emailRef} />
        <ErrorValidation error={errors.email} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" ref={passwordRef} />
        <ErrorValidation error={errors.password} />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" ref={confirmPasswordRef} />
        <ErrorValidation error={errors.confirmPassword} />
      </div>
      <div>
        <label>Gender</label>
        <input
          id="male"
          type="radio"
          value="male"
          ref={maleRef}
          name="gender"
        />
        <label htmlFor="male">Male</label>
        <input
          id="female"
          type="radio"
          value="female"
          ref={femaleRef}
          name="gender"
        />
        <label htmlFor="female">Female</label>
        <ErrorValidation error={errors.gender} />
      </div>
      <div>
        <input id="acceptTerms" type="checkbox" ref={acceptTermsRef} />
        <label htmlFor="acceptTerms">I accept the terms and conditions</label>
        <ErrorValidation error={errors.acceptTerms} />
      </div>
      <div>
        <label htmlFor="picture">Picture</label>
        <input id="picture" type="file" ref={pictureRef} />
        <ErrorValidation error={errors.picture} />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          type="text"
          value={country}
          onChange={handleCountryChange}
          list="countries"
        />
        <datalist id="countries">
          {filteredCountries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        <ErrorValidation error={errors.country} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
