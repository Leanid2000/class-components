import { type Parameters } from '../interfaces/interfaces';
import { memo, type ChangeEvent } from 'react';

const additionalColumns: Parameters[] = [
  { parameter: 'methane' },
  { parameter: 'oil_co2' },
  { parameter: 'temperature_change_from_co2' },
];

export const ColumnSelection = memo(
  ({
    changeColumns,
  }: {
    changeColumns: (event: ChangeEvent<HTMLInputElement>) => void;
  }) => {
    //   const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     const newColumns = event.target.value;
    //     if (event.target.checked) {
    //       addColumns([...checkedParams, { parameter: newColumns }]);
    //     } else {
    //       const position = checkedParams.findIndex(
    //         (elem) => elem.parameter === newColumns
    //       );
    //       const columns = [...checkedParams];
    //       columns.splice(position, 1);
    //       addColumns(columns);
    //     }
    //   };

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
