import { zodResolver } from '@hookform/resolvers/zod';
import { form, type Form } from '../schemes/form';
import { useForm } from 'react-hook-form';
import { Input } from './Input';
import { Select } from './Select';
import { Checkbox } from './Checkbox';
import { Datalist } from './Datalist';
import { ImageInput } from './ImageInput';
import { LABEL } from '../constants/constants';

export const HookForm = ({
  setFormInStore,
  countries,
}: {
  setFormInStore: (data: Form, isHookForm: boolean) => void;
  countries: string[];
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setValue,
  } = useForm({
    resolver: zodResolver(form),
    mode: 'onChange',
  });

  const onSubmit = (data: Form) => {
    setFormInStore(data, true);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] as File;
    setValue('image', file);
    trigger('image');
  };

  return (
    <>
      <form
        encType="multipart/form-data"
        className='absolute flex flex-col items-center justify-center  top-7 left-1/2 -translate-x-1/2 -translate-y-1/2" w-110 m-auto border-2  rounded-md py-2 z-70 bg-white'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="name"
          errorMassage={errors.name?.message}
          label={LABEL.NAME}
          register={register}
          focus={true}
        />
        <Input
          id="age"
          errorMassage={errors.age?.message}
          label={LABEL.AGE}
          register={register}
        />
        <Input
          id="email"
          errorMassage={errors.email?.message}
          label={LABEL.EMAIL}
          register={register}
        />
        <Input
          id="password"
          errorMassage={errors.password?.message}
          label={LABEL.PASSWORD}
          register={register}
        />
        <Input
          id="passwordRepeat"
          errorMassage={errors.passwordRepeat?.message}
          label={LABEL.PASSWORDRepeat}
          register={register}
        />
        <Select
          id="gender"
          options={['Male', 'Female', 'Dragon King']}
          label={LABEL.GENDER}
          register={register}
        />
        <Datalist
          id="country"
          errorMassage={errors.country?.message}
          label={LABEL.COUNTRY}
          countries={countries}
          register={register}
        />
        <ImageInput
          id="image"
          errorMassage={errors.image?.message}
          label={LABEL.IMAGE}
          onFileChange={onFileChange}
        />
        <Checkbox
          id="checked"
          errorMassage={errors.checked?.message}
          label={LABEL.CHECKED}
          register={register}
        />
        <button
          type="submit"
          className={`w-60 h-10 rounded-md cursor-pointer 
    ${isValid ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
          disabled={!isValid}
        >
          Submit
        </button>
      </form>
    </>
  );
};
