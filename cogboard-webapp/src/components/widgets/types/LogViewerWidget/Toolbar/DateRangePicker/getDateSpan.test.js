import moment from 'moment-timezone';
import { getDateSpan } from './helpers';

const time20 = '2021-12-22T20:00:00.000Z';
const time22 = '2021-12-22T22:00:00.000Z';

const widgetLocalStorage = {
  get: () => ({ dateSpan: { begin: time20, end: time22 } })
};
const emptyWidgetLocalStorage = { get: () => ({}) };

it('returns dates as momentjs object', () =>
  expect(getDateSpan(widgetLocalStorage)).toEqual({
    begin: moment(time20),
    end: moment(time22)
  }));

it('returns null when no date defined', () =>
  expect(getDateSpan(emptyWidgetLocalStorage)).toEqual({
    begin: null,
    end: null
  }));
