export type Parameters = {
  parameter: string;
};

export type Data = {
  year: number;
  population: number;
  co2: number;
  co2_per_capita: number;
  methane?: number;
  oil_co2?: number;
  temperature_change_from_co2?: number;
};

type DataInf = {
  data: Data[];
  iso_code: string;
};

export type Response = {
  [key: string]: DataInf;
};

export type SortParam =
  | 'name ▲'
  | 'name ▼'
  | 'name'
  | 'population ▲'
  | 'population ▼';
