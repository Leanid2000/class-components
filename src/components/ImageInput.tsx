import { INPUT } from '../constants/constants';
import type { Id } from '../interfaces/interfaces';

export const ImageInput = ({
  id,
  errorMassage,
  label,
  onFileChange,
}: {
  id: Id;
  errorMassage: string | undefined;
  label: string;
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="block h-28 w-100">
      <label htmlFor={id} className="block h-2">
        {label}
      </label>
      <br />
      <input
        id={INPUT.FILE_UPLOAD}
        type={INPUT.TYPE_file}
        onChange={onFileChange}
        name={id}
        className="hidden"
      />
      <label
        htmlFor={INPUT.FILE_UPLOAD}
        className="cursor-pointer inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Select a file
      </label>
      {errorMassage && <p className="text-red-600 text-xs">{errorMassage}</p>}
    </div>
  );
};
