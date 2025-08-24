import type { UseFormRegister } from 'react-hook-form';
import type { Id } from '../interfaces/interfaces';
import type { Form } from '../schemes/form';

export const Checkbox = ({
  id,
  errorMassage,
  label,
  register,
}: {
  id: Id;
  errorMassage: string | undefined;
  label: string;
  register?: UseFormRegister<Form>;
}) => {
  const changeRegister = register ? register(id) : {};
  return (
    <div className="h-20 w-100">
      <label htmlFor={id} className="flex items-center ">
        <input
          type="checkbox"
          {...changeRegister}
          name={id}
          id={id}
          className="w-5 h-5"
        />
        <p className="px-2">{label}</p>
      </label>

      {errorMassage && <p className="text-red-600 text-xs">{errorMassage}</p>}
    </div>
  );
};
