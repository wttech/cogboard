import { filterByLevel } from './helpers';

const log = {
  _id: '61b4c753bc103d391657c49c',
  seq: 228,
  insertedOn: 1639237459,
  date: '2021-12-11T15:44:00',
  variableData: []
};

it('lets through log with unknown level', () =>
  expect(filterByLevel({ ...log, type: 'smth' }, 'error')).toBeTruthy());

it('is not case sensitive', () =>
  expect(filterByLevel({ ...log, type: 'eRroR' }, 'ErROr')).toBeTruthy());

it('lets through logs with greater level', () =>
  expect(filterByLevel({ ...log, type: 'error' }, 'info')).toBeTruthy());

it('filters out logs with lower level', () =>
  expect(filterByLevel({ ...log, type: 'info' }, 'warning')).toBeFalsy());
