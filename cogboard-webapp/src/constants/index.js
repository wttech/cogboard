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

export const ROWS_MIN = 1;
export const ItemTypes = {
  WIDGET: 'widget'
};
