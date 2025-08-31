import { type Parameters, type Response } from '../../interfaces/interfaces';
import { memo } from 'react';
import { Card } from './Card/Card';

const List = memo(
  ({
    data = {},
    checkedParams,
    year,
  }: {
    data: Response | undefined;
    checkedParams: Parameters[];
    year: number;
  }) => {
    return (
      <div className="m-auto mt-5">
        {Object.keys(data).map((country) => {
          return (
            <Card
              key={country}
              data={data}
              checkedParams={checkedParams}
              year={year}
              country={country}
            />
          );
        })}
      </div>
    );
  }
);

export default List;
