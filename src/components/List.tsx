import Table from './Table';
import {
  type Data,
  type Parameters,
  type Response,
} from '../interfaces/interfaces';
import { memo } from 'react';

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
          const countryData: Data[] = data[country].data;
          const position = countryData.findIndex((elem) => elem.year === year);
          return (
            <div
              key={country}
              className="flex flex-col justify-center items-center border-b-5 w-150 pb-5"
            >
              <p>Name: {country}</p>
              <p>ISO: {data[country].iso_code}</p>
              <p>Population: {countryData[position]?.population || 'N/A'}</p>
              {position !== -1 && (
                <Table
                  data={countryData[position]}
                  checkedParams={checkedParams}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

export default List;
