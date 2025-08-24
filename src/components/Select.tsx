import type { UseFormRegister } from 'react-hook-form';
import type { Id } from '../interfaces/interfaces';
import type { Form } from '../schemes/form';

export const Select = ({
  id,
  label,
  options,
  register,
}: {
  id: Id;
  label: string;
  options: string[];
  register?: UseFormRegister<Form>;
}) => {
  const changeRegister = register ? register(id) : {};
  return (
    <div className="h-20 w-100">
      <label htmlFor={id} className="block h-2">
        {label}
      </label>
      <br />
      <select
        id={id}
        {...changeRegister}
        name={id}
        className="border-2 rounded-md h-6 w-50"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
