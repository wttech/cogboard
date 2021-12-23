import { filterByDateSpan } from './helpers';
import moment from 'moment-timezone';

const log = {
  _id: '61b4c753bc103d391657c49c',
  seq: 228,
  insertedOn: 1639237459,
  type: 'info',
  variableData: []
};

const spanTime10 = moment('2021-12-22T10:00:00.000Z');
const logTime15 = '2021-12-22T15:00:00.000';
const spanTime19 = moment('2021-12-22T19:00:00.000Z');
const spanTime20 = moment('2021-12-22T20:00:00.000Z');

it('filters out log without date', () =>
  expect(
    filterByDateSpan(log, { begin: spanTime10, end: spanTime20 })
  ).toBeFalsy());

it('should be truthy when no date span is provided', () =>
  expect(filterByDateSpan(log, { begin: null, end: null })).toBeTruthy());

it('filters by begin date', () => {
  expect(
    filterByDateSpan(
      { ...log, date: logTime15 },
      { begin: spanTime10, end: null }
    )
  ).toBeTruthy();
  expect(
    filterByDateSpan(
      { ...log, date: '2021-12-22T20:00:00' },
      { begin: spanTime20, end: null }
    )
  ).toBeFalsy();
});

it('filters by end date', () => {
  expect(
    filterByDateSpan(
      { ...log, date: logTime15 },
      { begin: null, end: spanTime20 }
    )
  ).toBeTruthy();
  expect(
    filterByDateSpan(
      { ...log, date: logTime15 },
      { begin: null, end: spanTime10 }
    )
  ).toBeFalsy();
});

it('filters by date span', () => {
  expect(
    filterByDateSpan(
      { ...log, date: logTime15 },
      { begin: spanTime10, end: spanTime20 }
    )
  ).toBeTruthy();
  expect(
    filterByDateSpan(
      { ...log, date: logTime15 },
      { begin: spanTime19, end: spanTime20 }
    )
  ).toBeFalsy();
});
