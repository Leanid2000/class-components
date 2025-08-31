import { memo } from 'react';
import { Button } from './Button/Button';

export const SortSelector = memo(
  ({
    changeSortParams,
    sortParams,
  }: {
    changeSortParams: (event: React.MouseEvent<HTMLInputElement>) => void;
    sortParams: string[];
  }) => {
    return (
      <div className="flex gap-1">
        {sortParams.map((param) => {
          return (
            <Button
              key={param}
              changeSortParams={changeSortParams}
              sortParam={param}
            />
          );
        })}
      </div>
    );
  }
);
