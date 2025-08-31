import { memo, type ChangeEvent } from 'react';

export const SearchInput = memo(
  ({
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
  }
);
