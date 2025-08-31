import type { ChangeEvent } from 'react';

export const YearSelector = ({
  availableYears = [1, 2],
  year,
  changeYear,
}: {
  availableYears: number[] | undefined;
  year: number;
  changeYear: (event: ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const years = new Array(availableYears[1] - availableYears[0] + 1)
    .fill(0)
    .map((_, num) => num + availableYears[0])
    .reverse();

  return (
    <select value={year} onChange={changeYear}>
      {years.map((year) => {
        return (
          <option key={year} value={year}>
            {year}
          </option>
        );
      })}
    </select>
  );
};
