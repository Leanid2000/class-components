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
import { ColumnSelection } from './components/ColumnSelection/ColumnSelection';
import { YearSelector } from './components/YearSelector/YearSelector';
import { SortSelector } from './components/SortSelector/SortSelector';
import { SearchInput } from './components/SearchInput/SearchInput ';
import { NAME, SORT, TableParameters } from './constants/constants';

const List = lazy(() => import('./components/List/List'));

const App = () => {
  const [data, setData] = useState<Response | null>(null);
  const [checkedParams, setCheckedParams] =
    useState<Parameters[]>(TableParameters);
  const [year, setYear] = useState<number>(2);
  const [sortName, setSortName] = useState<string>(SORT.nameUp);
  const [sortPopulation, setSortPopulation] = useState<string>(SORT.population);
  const [searchInput, setSearchInput] = useState<string>('');
  const sortParams = [sortName, sortPopulation];

  const addColumns = useCallback((columns: Parameters[]) => {
    setCheckedParams(columns);
  }, []);

  const changeSortParams = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      const param = event.currentTarget.value;

      if (param.startsWith(SORT.name)) {
        if (param.includes(SORT.upSymbol)) {
          setSortName(SORT.nameDown);
        } else if (param.includes(SORT.downSymbol)) {
          setSortName(SORT.nameUp);
        } else {
          setSortName(SORT.nameUp);
        }
        setSortPopulation(SORT.population);
        return;
      }

      if (param.startsWith(SORT.population)) {
        if (param.includes(SORT.upSymbol)) {
          setSortPopulation(SORT.populationDown);
        } else if (param.includes(SORT.downSymbol)) {
          setSortPopulation(SORT.populationUp);
        } else {
          setSortPopulation(SORT.populationUp);
        }
        setSortName(SORT.name);
        return;
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
    if (searchInput) {
      values = values.filter(([name]) =>
        name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    if (sortName === SORT.nameUp || sortName === SORT.nameDown) {
      values.sort((a, b) =>
        sortName === SORT.nameUp
          ? a[0].localeCompare(b[0])
          : b[0].localeCompare(a[0])
      );
      return Object.fromEntries(values);
    }
    if (
      sortPopulation === SORT.populationUp ||
      sortPopulation === SORT.populationDown
    ) {
      values.sort((a, b) => {
        const positionFirst = a[1].data.find((elem) => elem.year === year);
        const positionSecond = b[1].data.find((elem) => elem.year === year);

        const A = positionFirst?.population || 0;
        const B = positionSecond?.population || 0;

        return sortPopulation === SORT.populationUp ? A - B : B - A;
      });

      return Object.fromEntries(values);
    }
    return data;
  }, [data, sortPopulation, sortName, searchInput, year]);

  const changeYear = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(event.target.value));
  }, []);

  const changeColumns = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
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
    },
    [checkedParams]
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(NAME.URL_JSON);
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
