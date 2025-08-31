import { type Parameters } from '../interfaces/interfaces';

export const NAME = {
  URL_JSON: '/owid-co2-data.json',
  NOTFOUND: 'N/A',
};

export const SORT = {
  populationUp: 'population ▲',
  populationDown: 'population ▼',
  population: 'population',
  nameUp: 'name ▲',
  nameDown: 'name ▼',
  name: 'name',
  upSymbol: '▲',
  downSymbol: '▼',
};

export const TableParameters = [
  { parameter: 'year' },
  { parameter: 'population' },
  { parameter: 'co2' },
  { parameter: 'co2_per_capita' },
];

export const additionalColumns: Parameters[] = [
  { parameter: 'methane' },
  { parameter: 'oil_co2' },
  { parameter: 'temperature_change_from_co2' },
];
