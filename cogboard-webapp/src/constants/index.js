import {getGmtTimezones} from "../components/helpers";

export const URL = {
  LOAD_DATA: '/api/config', // for front dev change to '/data.json'
  SAVE_DATA: '/api/config/save',
  UPDATE_WIDGET: '/api/widget/update',
  DELETE_WIDGET: '/api/widget/delete',
  LOGIN: '/api/login'
};
export const COLUMNS_MIN = 1;
export const COLUMNS_MAX = 20;

export const GMT_TIMEZONES = getGmtTimezones();
export const DATE_FORMATS = [
  {
    display: '29/08/2019',
    value: 'DD/MM/YYYY'
  },
  {
    display: 'Friday, 29/08/2019',
    value: 'dddd, DD/MM/YYYY'
  },
  {
    display: '29 Aug 2019',
    value: 'DD MMM YYYY'
  },
  {
    display: 'Friday, 29 Aug 2019',
    value: 'dddd, DD MMM YYYY'
  },
  {
    display: '29th August 2019',
    value: 'Do MMMM YYYY'
  },
  {
    display: 'Friday, 29th August 2019',
    value: 'dddd, Do MMMM YYYY'
  }
];
export const TIME_FORMATS = [
  {
    display: '12-hour (AM/PM)',
    value: 'LTS'
  },
  {
    display: '24-hour',
    value: 'HH:MM:ss'
  }
];

export const ROWS_MIN = 1;
export const ItemTypes = {
  WIDGET: 'widget'
};
