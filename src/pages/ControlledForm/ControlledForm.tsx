import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { schema } from '../../config/formValidateConfig';
import { setFormData } from '../../redux/features/formSlice';
import ErrorValidation from '../../components/errorValidation/ErrorValidation';
import AutoComplitInput from '../../components/AutoComplitInput/AutoComplitInput';
import { FormModel } from '../../model/formModel';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import PasswordStrength from '../../components/PasswordStrength/PasswordStrength';

const ControlledForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const password = watch('password');

  const onSubmit = (data: FormModel) => {
    let file: string | ArrayBuffer | null = null;
    const reader = new FileReader();
    if (data.picture && data.picture instanceof File) {
      reader.readAsDataURL(data.picture);
      reader.onloadend = () => {
        file = reader.result;
        const dispatchData = {
          ...data,
          picture: file,
        };
        dispatch(setFormData(dispatchData));
        navigate('/content');
      };
    }
  };

  return (
    <>
      <h2>Controlled form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" {...register('name')} />
          <ErrorValidation error={errors.name?.message} />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input id="age" type="number" {...register('age')} />
          <ErrorValidation error={errors.age?.message} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} />
          <ErrorValidation error={errors.email?.message} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register('password')} />
          <PasswordStrength password={password || ''} />
          <ErrorValidation error={errors.password?.message} />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
          <ErrorValidation error={errors.confirmPassword?.message} />
        </div>
        <div>
          <label>Gender</label>
          <input id="male" type="radio" value="male" {...register('gender')} />
          <label htmlFor="male">Male</label>
          <input
            id="female"
            type="radio"
            value="female"
            {...register('gender')}
          />
          <label htmlFor="female">Female</label>
          <ErrorValidation error={errors.gender?.message} />
        </div>
        <div>
          <input
            id="acceptTerms"
            type="checkbox"
            {...register('acceptTerms')}
          />
          <label htmlFor="acceptTerms">I accept the terms and conditions</label>
          <ErrorValidation error={errors.acceptTerms?.message} />
        </div>
        <div>
          <label htmlFor="picture">Picture</label>
          <Controller
            name="picture"
            control={control}
            render={({ field }) => (
              <input
                id="picture"
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    field.onChange(e.target.files[0]);
                  }
                }}
                onBlur={field.onBlur}
              />
            )}
          />
          <ErrorValidation error={errors.picture?.message} />
        </div>
        <div>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <AutoComplitInput
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          <ErrorValidation error={errors.country?.message} />
        </div>
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </>
  );
};

export default ControlledForm;
