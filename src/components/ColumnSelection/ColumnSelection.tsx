import { additionalColumns } from '../../constants/constants';
import { memo, type ChangeEvent } from 'react';

export const ColumnSelection = memo(
  ({
    changeColumns,
  }: {
    changeColumns: (event: ChangeEvent<HTMLInputElement>) => void;
  }) => {
    return (
      <div className="flex m-auto mt-5 gap-5">
        <p className="mb-2">Additional columns:</p>
        {additionalColumns.map((columns, num) => {
          return (
            <div key={num}>
              <input
                type="checkbox"
                className="mr-2"
                value={columns.parameter}
                onChange={changeColumns}
              />
              {columns.parameter}
            </div>
          );
        })}
      </div>
    );
  }
);
