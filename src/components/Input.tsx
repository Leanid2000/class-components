import type { UseFormRegister } from 'react-hook-form';
import type { Form } from '../schemes/form';
import type { Id } from '../interfaces/interfaces';
import { INPUT } from '../constants/constants';

export const Input = ({
  id,
  errorMassage,
  label,
  register,
  type,
  focus,
}: {
  id: Id;
  errorMassage: string | undefined;
  label: string;
  register?: UseFormRegister<Form>;
  type?: string;
  focus?: boolean;
}) => {
  const changeRegister = register ? register(id) : {};
  const changeFocus = focus ? { autoFocus: true } : {};

  return (
    <div className="h-20 w-100">
      <label htmlFor={id} className="block h-1">
        {label}
      </label>
      <br />
      <input
        id={id}
        type={type || INPUT.TYPE_text}
        {...changeRegister}
        name={id}
        className="border-2 w-100 -mt-1 rounded-md h-6 px-1"
        {...changeFocus}
      />
      {errorMassage && (
        <p className="text-red-600 w-130 text-xs">{errorMassage}</p>
      )}
    </div>
  );
};
