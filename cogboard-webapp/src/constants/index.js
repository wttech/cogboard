export const URL = {
  LOAD_DATA: '/api/config',
  SAVE_DATA: '/api/config/save',
  UPDATE_WIDGET: '/api/widget/update',
  DELETE_WIDGET: '/api/widget/delete',
  LOGIN: '/api/login'
};
export const COLUMNS_MIN = 1;
export const COLUMNS_MAX = 20;

export const ROWS_MIN = 1;
export const ItemTypes = {
  WIDGET: 'widget',
  BOARD: 'board'
};

// props will be added to old configs on app init

export const INITIAL_BOARD_PROPS = {
  autoSwitch: false,
  switchInterval: 0
};
