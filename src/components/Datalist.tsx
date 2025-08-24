import type { UseFormRegister } from 'react-hook-form';
import type { Form } from '../schemes/form';
import type { Id } from '../interfaces/interfaces';

export const Datalist = ({
  id,
  errorMassage,
  label,
  countries,
  register,
}: {
  id: Id;
  errorMassage: string | undefined;
  label: string;
  countries: string[];
  register?: UseFormRegister<Form>;
}) => {
  const changeRegister = register ? register(id) : {};
  return (
    <div className="h-20 w-100">
      <label htmlFor={label} className="block h-2">
        {label}
      </label>
      <br />
      <input
        list={id}
        {...changeRegister}
        name={id}
        id={label}
        className="border-2 rounded-md h-6 w-50 -mt-1"
      />
      <datalist id={id}>
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
      {errorMassage && <p className="text-red-600 text-xs">{errorMassage}</p>}
    </div>
  );
};
