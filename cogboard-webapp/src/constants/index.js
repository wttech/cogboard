import { capitalize } from '../utils/common';

export const URL = {
  LOAD_DATA: '/api/config',
  SAVE_DATA: '/api/config/save',
  UPDATE_WIDGET: '/api/widget/update',
  DELETE_WIDGET: '/api/widget/delete',
  LOGIN: '/api/login',
  ENDPOINTS_ENDPOINT: '/api/endpoints',
  CREDENTIALS_ENDPOINT: '/api/credentials'
};
export const COLUMN_MULTIPLIER = 2;
export const ROW_MULTIPLIER = 2;
export const BOARD_COLUMNS_MIN = 4;
export const BOARD_COLUMNS_DEFAULT = 8;
export const BOARD_COLUMNS_MAX = 20;
export const BOARD_TITLE_LENGTH_LIMIT = 50;
export const SWITCH_INTERVAL_MIN = 3;

export const WIDGET_COLUMNS_MIN = 0.5;
export const WIDGET_ROWS_MIN = 0.5;
export const WIDGET_ROWS_MAX = 4;

export const WIDGET_TITLE_LENGTH_LIMIT = 25;

export const TEXT_SIZES = [
  {
    display: 'XXL',
    value: 'h2'
  },
  {
    display: 'XL',
    value: 'h3'
  },
  {
    display: 'L',
    value: 'h4'
  },
  {
    display: 'M',
    value: 'h5'
  },
  {
    display: 'S',
    value: 'h6'
  },
  {
    display: 'XS',
    value: 'subtitle1'
  },
  {
    display: 'XXS',
    value: 'subtitle2'
  }
];

export const REQUEST_METHODS = [
  {
    display: 'GET',
    value: 'get'
  },
  {
    display: 'PUT',
    value: 'put'
  },
  {
    display: 'POST',
    value: 'post'
  },
  {
    display: 'DELETE',
    value: 'delete'
  }
];

export const ItemTypes = {
  WIDGET: 'widget',
  BOARD: 'board'
};

export const AEM_HEALTH_CHECKS = {
  inactiveBundles: 'Active Bundles',
  asyncIndexHealthCheck: 'Async Index Health Check',
  codeCacheHealthCheck: 'Code Cache Health Check',
  DiskSpaceHealthCheck: 'Disk Space',
  logErrorHealthCheck: 'Log Errors',
  ObservationQueueLengthHealthCheck: 'Observation Queue Length',
  resourceSearchPathErrorHealthCheck: 'Resource Search Path Errors',
  requestsStatus: 'Request Performance',
  queriesStatus: 'Query Performance',
  queryTraversalLimitsBundle: 'Query Traversal Limits',
  securitychecks: 'Security Checks',
  slingJobs: 'Sling Jobs',
  slingDiscoveryOakSynchronizedClocks: 'Synchronized Clocks',
  systemchecks: 'System Maintenance'
};

export const ALL_SONARQUBE_METRICS = [
  'blocker_violations',
  'critical_violations',
  'major_violations',
  'minor_violations',
  'info_violations',
  'bugs',
  'code_smells',
  'vulnerabilities'
];

// props will be added to old configs on app init

export const INITIAL_BOARD_PROPS = {
  autoSwitch: false,
  switchInterval: 0
};

export const validationMessages = {
  STRING_LENGTH: (name, max) =>
    `${name} length must be less or equal to ${max}.`,
  FIELD_REQUIRED: () => 'This field is required',
  NUMBER_MIN: (name, min) => `${name} number cannot be less than ${min}.`,
  NUMBER_MAX: (name, max) => `${name} number cannot be more than ${max}.`,
  INVALID_URL: () => 'Invalid URL',
  FIELD_MIN_ITEMS: () => 'This field must have at least 1 item.',
  UNIQUE_FIELD: () => 'This field must be unique.',
  PASSWORD_MATCH: () => 'Password must match.'
};

export const NOTIFICATIONS = {
  LOGIN: userRole => ({
    type: 'success',
    message: `Logged in as ${userRole}`,
    duration: 3000
  }),
  LOGOUT: (userRole, reason = '') => ({
    type: 'info',
    message: `${capitalize(userRole)} logged out${
      reason ? ' - ' : ''
    }${reason}`,
    duration: 3000
  })
};
