import type {
  Data,
  Parameters,
  Response,
} from '../../../interfaces/interfaces';
import Table from './Table/Table';

export const Card = ({
  data,
  checkedParams,
  year,
  country,
}: {
  data: Response;
  checkedParams: Parameters[];
  year: number;
  country: string;
}) => {
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
        <Table data={countryData[position]} checkedParams={checkedParams} />
      )}
    </div>
  );
};
