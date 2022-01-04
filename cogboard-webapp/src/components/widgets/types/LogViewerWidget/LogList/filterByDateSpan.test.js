import { filterByDateSpan } from './helpers';
import moment from 'moment-timezone';

const log = {
  _id: '61b4c753bc103d391657c49c',
  seq: 228,
  insertedOn: 1639237459,
  type: 'info',
  variableData: []
};

it('filters out log without date', () =>
  expect(
    filterByDateSpan(log, {
      begin: moment('2021-12-22T10:00:00.000Z'),
      end: moment('2021-12-22T20:00:00.000Z')
    })
  ).toBeFalsy());

it('should filter in when no date span is provided', () =>
  expect(filterByDateSpan(log, { begin: null, end: null })).toBeTruthy());

it('filters by begin date', () => {
  expect(
    filterByDateSpan(
      { ...log, date: '2021-12-22T15:00:00.000' },
      { begin: moment('2021-12-22T10:00:00.000Z'), end: null }
    )
  ).toBeTruthy();
  expect(
    filterByDateSpan(
      { ...log, date: '2021-12-22T20:00:00' },
      { begin: moment('2021-12-22T20:00:00.000Z'), end: null }
    )
  ).toBeFalsy();
});

it('filters by end date', () => {
  expect(
    filterByDateSpan(
      { ...log, date: '2021-12-22T15:00:00.000' },
      { begin: null, end: moment('2021-12-22T20:00:00.000Z') }
    )
  ).toBeTruthy();
  expect(
    filterByDateSpan(
      { ...log, date: '2021-12-22T15:00:00.000' },
      { begin: null, end: moment('2021-12-22T10:00:00.000Z') }
    )
  ).toBeFalsy();
});

it('filters by date span', () => {
  expect(
    filterByDateSpan(
      { ...log, date: '2021-12-22T15:00:00.000' },
      {
        begin: moment('2021-12-22T10:00:00.000Z'),
        end: moment('2021-12-22T20:00:00.000Z')
      }
    )
  ).toBeTruthy();
  expect(
    filterByDateSpan(
      { ...log, date: '2021-12-22T15:00:00.000' },
      {
        begin: moment('2021-12-22T19:00:00.000Z'),
        end: moment('2021-12-22T20:00:00.000Z')
      }
    )
  ).toBeFalsy();
});
