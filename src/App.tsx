import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from 'react';
import { type Parameters, type Response } from './interfaces/interfaces';
import { ColumnSelection } from './components/ColumnSelection';
import { YearSelector } from './components/YearSelector';
import { SortSelector } from './components/SortSelector';
import { SearchInput } from './components/SearchInput ';

const List = lazy(() => import('./components/List'));

const tableParameters: Parameters[] = [
  { parameter: 'year' },
  { parameter: 'population' },
  { parameter: 'co2' },
  { parameter: 'co2_per_capita' },
];

const App = () => {
  const [data, setData] = useState<Response | null>(null);
  const [checkedParams, setCheckedParams] =
    useState<Parameters[]>(tableParameters);
  const [year, setYear] = useState<number>(2);
  const [sortName, setSortName] = useState<string>('name ▲');
  const [sortPopulation, setSortPopulation] = useState<string>('population');
  const [searchInput, setSearchInput] = useState<string>('');
  const sortParams = [sortName, sortPopulation];

  const addColumns = useCallback((columns: Parameters[]) => {
    setCheckedParams(columns);
  }, []);

  const changeSortParams = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      const param = event.currentTarget.value;
      if (param.includes('name')) {
        if (param.includes('▲')) {
          setSortName('name ▼');
          return;
        }
        if (param.includes('▼')) {
          setSortName('name ▲');
          return;
        }
        setSortName('name');
      }
      if (param.includes('population')) {
        if (param.includes('▲')) {
          setSortPopulation('population ▼');
          return;
        }
        if (param.includes('▼')) {
          setSortPopulation('population ▲');
          return;
        }
        setSortPopulation('population');
      }
      if (param === 'population') {
        setSortPopulation('population ▲');
        setSortName('name');
      }
      if (param === 'name') {
        setSortName('name ▲');
        setSortPopulation('population');
      }
    },
    []
  );

  const changeSearchInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchInput(event.target.value);
    },
    []
  );

  const availableYears = useMemo(() => {
    if (!data) {
      return;
    }
    const values = Object.values(data);
    const lastYear = values[0].data.at(-1)?.year || 2020;
    const firstYear = values.reduce(
      (year, elem) => (elem.data[0].year < year ? elem.data[0].year : year),
      9000
    );
    return [firstYear, lastYear];
  }, [data]);

  const fillterData = useMemo(() => {
    if (!data) {
      return;
    }
    let values = Object.entries(data);
    console.log('searchInput1', searchInput);

    if (searchInput) {
      console.log('searchInput', searchInput);
      values = values.filter(([name]) =>
        name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    if (sortName === 'name ▲') {
      values.sort((a, b) => a[0].localeCompare(b[0]));
      return Object.fromEntries(values);
    }
    if (sortName === 'name ▼') {
      values.sort((a, b) => b[0].localeCompare(a[0]));
      return Object.fromEntries(values);
    }
    if (
      sortPopulation === 'population ▲' ||
      sortPopulation === 'population ▼'
    ) {
      values.sort((a, b) => {
        const positionFirst = a[1].data.find((elem) => elem.year === year);
        const positionSecond = b[1].data.find((elem) => elem.year === year);

        const A = positionFirst?.population || 0;
        const B = positionSecond?.population || 0;

        return sortPopulation === 'population ▲' ? A - B : B - A;
      });

      return Object.fromEntries(values);
    }
    return data;
  }, [data, sortPopulation, sortName, searchInput, year]);

  const changeYear = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(event.target.value));
  }, []);

  const changeColumns = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newColumns = event.target.value;
    if (event.target.checked) {
      addColumns([...checkedParams, { parameter: newColumns }]);
    } else {
      const position = checkedParams.findIndex(
        (elem) => elem.parameter === newColumns
      );
      const columns = [...checkedParams];
      columns.splice(position, 1);
      addColumns(columns);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/owid-co2-data.json');
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (availableYears) {
      setYear(availableYears[1]);
    }
  }, [availableYears]);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col mt-5">
      <Suspense fallback={<p>Loading...</p>}>
        <div className="flex mx-auto gap-7">
          <SearchInput changeSearchInput={changeSearchInput} />
          <SortSelector
            changeSortParams={changeSortParams}
            sortParams={sortParams}
          />
          <YearSelector
            availableYears={availableYears}
            year={year}
            changeYear={changeYear}
          />
        </div>

        <ColumnSelection changeColumns={changeColumns} />
        <List data={fillterData} checkedParams={checkedParams} year={year} />
      </Suspense>
    </div>
  );
};

export default App;
