import { filterByRegExp } from './helpers';

const logHeader = {
  _id: '61b4c753bc103d391657c49c',
  seq: 228,
  insertedOn: 1639237459,
  date: '2021-12-11T15:44:00',
  type: 'DEBUG'
};

const log = {
  ...logHeader,
  variableData: [
    {
      header: 'FelixStartLevel',
      description: 'No description'
    },
    {
      header: 'id velit. vel pretium. ipsum suscipit',
      description: 'No message description'
    }
  ]
};
const emptyLog = {
  ...logHeader,
  variableData: [
    {
      header: '',
      description: ''
    }
  ]
};

const filters = {
  startsWithA: {
    id: 'filter-3ea57f8b-6c1c-4e2f-bbc5-760aa0526e8e',
    checked: true,
    regExp: '^a',
    label: 'starts with a'
  },
  velit: {
    id: 'filter-2afee54b-8ab6-4a0c-81db-9c92e7bf5203',
    checked: true,
    label: 'velit',
    regExp: 'velit'
  },
  startsWithF: {
    id: 'filter-b9b72673-e6ca-481d-996a-293527032764',
    checked: true,
    label: 'starts with F',
    regExp: '^F'
  },
  endWithSuscipit: {
    id: 'filter-c9dac795-43c6-4a57-9329-5dd1573c9bf4',
    checked: true,
    label: 'ends with suscipit',
    regExp: 'suscipit$'
  }
};

it('shows log without filters', () =>
  expect(filterByRegExp(log, [])).toBeTruthy());

it('filters with multiple rules', () =>
  expect(
    filterByRegExp(log, [filters.startsWithA, filters.velit])
  ).toBeFalsy());

it('filters with multiple rules 2', () =>
  expect(
    filterByRegExp(log, [
      filters.velit,
      filters.startsWithF,
      filters.endWithSuscipit
    ])
  ).toBeTruthy());

it('checks if filter is enabled', () =>
  expect(
    filterByRegExp(log, [
      { ...filters.startsWithA, checked: false },
      filters.velit
    ])
  ).toBeTruthy());

it('filters empty logs', () =>
  expect(
    filterByRegExp(emptyLog, [filters.startsWithA, filters.endWithSuscipit])
  ).toBeFalsy());
