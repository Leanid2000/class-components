import type { ChangeEvent } from 'react';

export const SearchInput = ({
  changeSearchInput,
}: {
  changeSearchInput: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type="text"
      className="border rounded-2xl pl-5"
      onChange={changeSearchInput}
    />
  );
};
