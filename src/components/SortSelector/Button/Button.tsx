import { memo } from 'react';

export const Button = memo(
  ({
    changeSortParams,
    sortParam,
  }: {
    changeSortParams: (event: React.MouseEvent<HTMLInputElement>) => void;
    sortParam: string;
  }) => {
    return (
      <input
        type="button"
        className="rounded w-30 h-7 bg-amber-500"
        value={sortParam}
        onClick={changeSortParams}
      ></input>
    );
  }
);
