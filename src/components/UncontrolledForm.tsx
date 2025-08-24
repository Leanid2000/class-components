import { form, type Form } from '../schemes/form';
import { Input } from './Input';
import { Select } from './Select';
import { Checkbox } from './Checkbox';
import { Datalist } from './Datalist';
import { ImageInput } from './ImageInput';
import { FORM, FORM_ID, LABEL } from '../constants/constants';
import { useRef, useState, type FormEvent } from 'react';
import type { Errors, ValidationErrors } from '../interfaces/interfaces';

export const UncontrolledForm = ({
  setFormInStore,
  countries,
}: {
  setFormInStore: (data: Form, isHookForm: boolean) => void;
  countries: string[];
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get(FORM_ID.NAME),
      age: formData.get(FORM_ID.AGE),
      email: formData.get(FORM_ID.EMAIL),
      password: formData.get(FORM_ID.PASSWORD),
      passwordRepeat: formData.get(FORM_ID.PASSWORDRepeat),
      gender: formData.get(FORM_ID.GENDER),
      checked: !!formData.get(FORM_ID.CHECKED),
      country: formData.get(FORM_ID.COUNTRY),
      image: formData.get(FORM_ID.IMAGE),
    };
    try {
      const dataStore = form.parse(data);
      setErrors({});
      setFormInStore(dataStore, false);
    } catch (error) {
      const validationErrors: ValidationErrors = {};
      (error as Errors).issues.map((elem) => {
        validationErrors[elem.path[0]] = elem.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <form
        ref={formRef}
        encType="multipart/form-data"
        className='absolute flex flex-col items-center justify-center  top-7 left-1/2 -translate-x-1/2 -translate-y-1/2" w-110 m-auto border-2  rounded-md py-2 z-70 bg-white'
        onSubmit={onSubmit}
      >
        <Input
          id="name"
          errorMassage={errors.name}
          label={LABEL.NAME}
          focus={true}
        />
        <Input id="age" errorMassage={errors.age} label={LABEL.AGE} />
        <Input id="email" errorMassage={errors.email} label={LABEL.EMAIL} />
        <Input
          id="password"
          errorMassage={errors.password}
          label={LABEL.PASSWORD}
        />
        <Input
          id="passwordRepeat"
          errorMassage={errors.passwordRepeat}
          label={LABEL.PASSWORDRepeat}
        />
        <Select id="gender" options={FORM.GENDER_NAME} label={LABEL.GENDER} />
        <Datalist
          id="country"
          errorMassage={errors.country}
          label={LABEL.COUNTRY}
          countries={countries}
        />
        <ImageInput
          id="image"
          errorMassage={errors.image}
          label={LABEL.IMAGE}
        />
        <Checkbox
          id="checked"
          errorMassage={errors.checked}
          label={LABEL.CHECKED}
        />
        <button
          type="submit"
          className="text-white w-60 h-10  rounded-md bg-blue-600 cursor-pointer"
        >
          Submit
        </button>
      </form>
    </>
  );
};
