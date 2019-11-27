import { capitalize } from '../helpers';

export const URL = {
  LOAD_DATA: '/api/config',
  SAVE_DATA: '/api/config/save',
  UPDATE_WIDGET: '/api/widget/update',
  DELETE_WIDGET: '/api/widget/delete',
  LOGIN: '/api/login'
};
export const COLUMNS_MIN = 4;
export const COLUMNS_DEFAULT = 8;
export const COLUMNS_MAX = 20;
export const ROWS_MIN = 1;
export const BOARD_TITLE_LENGTH_LIMIT = 25;
export const SWITCH_INTERVAL_MIN = 3;
export const WIDGET_COLUMNS_MIN = 1;
export const WIDGET_ROWS_MIN = 1;
export const WIDGET_ROWS_MAX = 4;
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

export const NOTIFICATIONS = {
  LOGIN: userRole => ({
    type: 'success',
    message: `Logged in as ${userRole}`,
    duration: 3000
  }),
  LOGOUT: userRole => ({
    type: 'info',
    message: `${capitalize(userRole)} logged out`,
    duration: 3000
  })
};
