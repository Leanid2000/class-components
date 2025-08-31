import { Button } from './Button';

export const SortSelector = ({
  changeSortParams,
  sortParams,
}: {
  changeSortParams: (param: string) => void;
  sortParams: string[];
}) => {
  // const

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
};
