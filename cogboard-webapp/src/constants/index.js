import { capitalize } from '../utils/common';

export const COLORS = {
  TRANSPARENT: 'transparent',
  WHITE: '#fff',
  BKGD_LIGHT: '#fffafa',
  BKGD_DARK: '#1c2630',
  BLACK: '#000',
  GREEN: '#019430',
  GREEN_DEFAULT: '#008000',
  ORANGE: '#ff9724',
  RED: '#e1312f',
  LIGHT_BLUE: '#bbdefb',
  BLUE: '#198cbd',
  PURPLE: '#26243e',
  YELLOW: '#FECD00'
};

export const URL = {
  LOAD_INFO: '/api/version',
  LOAD_DATA: '/api/config',
  SAVE_DATA: '/api/config/save',
  UPDATE_WIDGET: '/api/widget/update',
  DELETE_WIDGET: '/api/widget/delete',
  LOGIN: '/api/login',
  ENDPOINTS_ENDPOINT: '/api/endpoints',
  CREDENTIALS_ENDPOINT: '/api/credentials',
  UPDATE_USER_SETTINGS: '/api/user/update',
  UPDATE_INFO: 'https://github.com/Cognifide/cogboard/wiki#update',
  CREDENTIAL_INFO: 'https://github.com/Cognifide/cogboard/wiki#credentials'
};
export const COLUMN_MULTIPLIER = 2;
export const ROW_MULTIPLIER = 2;
export const BOARD_COLUMNS_MIN = 4;
export const BOARD_COLUMNS_MAX = 20;
export const BOARD_TITLE_LENGTH_LIMIT = 50;
export const SWITCH_INTERVAL_MIN = 3;

export const WIDGET_COLUMNS_MIN = 0.5;
export const WIDGET_ROWS_MIN = 0.5;
export const WIDGET_ROWS_MAX = 4;

export const WIDGET_TITLE_LENGTH_LIMIT = 25;

export const USER_LOGIN_LENGTH = 25;

export const CHECK_NEW_VERSION_DELAY = 3 * 60 * 60 * 1000; // 3h

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

export const CONTENT_TYPE = [
  {
    display: 'application/json',
    value: 'application/json'
  },
  {
    display: 'application/xml',
    value: 'application/xml'
  },
  {
    display: 'multipart/form-data',
    value: 'multipart/form-data'
  },
  {
    display: 'text/html',
    value: 'text/html'
  },
  {
    display: 'text/plain',
    value: 'text/plain'
  }
];

export const ItemTypes = {
  WIDGET: 'widget',
  BOARD: 'board'
};

export const DEFAULT_BOARD_TYPE = 'WidgetBoard';

export const AEM_HEALTH_CHECKS = [
  {
    display: 'Inactive Bundles',
    value: 'inactiveBundles'
  },
  {
    display: 'Async Index Health Check',
    value: 'asyncIndexHealthCheck'
  },
  {
    display: 'Code Cache Health Check',
    value: 'codeCacheHealthCheck'
  },
  {
    display: 'Disk Space',
    value: 'DiskSpaceHealthCheck'
  },
  {
    display: 'Log Errors',
    value: 'logErrorHealthCheck'
  },
  {
    display: 'Observation Queue Length',
    value: 'ObservationQueueLengthHealthCheck'
  },
  {
    display: 'Resource Search Path Errors',
    value: 'resourceSearchPathErrorHealthCheck'
  },
  {
    display: 'Request Performance',
    value: 'requestsStatus'
  },
  {
    display: 'Query Performance',
    value: 'queriesStatus'
  },
  {
    display: 'Query Traversal Limits',
    value: 'queryTraversalLimitsBundle'
  },
  {
    display: 'Security Checks',
    value: 'securitychecks'
  },
  {
    display: 'Sling Jobs',
    value: 'slingJobs'
  },
  {
    display: 'Synchronized Clocks',
    value: 'slingDiscoveryOakSynchronizedClocks'
  },
  {
    display: 'System Maintenance',
    value: 'systemchecks'
  }
];

export const ALL_SONARQUBE_METRICS = [
  {
    display: 'Blocker Violations',
    value: 'blocker_violations'
  },
  {
    display: 'Critical Violations',
    value: 'critical_violations'
  },
  {
    display: 'Major Violations',
    value: 'major_violations'
  },
  {
    display: 'Minor Violations',
    value: 'minor_violations'
  },
  {
    display: 'Info Violations',
    value: 'info_violations'
  },
  {
    display: 'Bugs',
    value: 'bugs'
  },
  {
    display: 'Code Smells',
    value: 'code_smells'
  },
  {
    display: 'Vulnerabilities',
    value: 'vulnerabilities'
  }
];

export const ZABBIX_METRICS = [
  {
    display: 'Active users',
    value: 'system.users.num'
  },
  {
    display: 'Available memory',
    value: 'vm.memory.size[available]'
  },
  {
    display: 'CPU utilization',
    value: 'system.cpu.util[,idle]'
  },
  {
    display: 'Mem heap size',
    value: 'jmx[\\"java.lang:type=Memory\\",\\"HeapMemoryUsage.used\\"]'
  },
  {
    display: 'Number of processes',
    value: 'proc.num[]'
  },
  {
    display: 'System uptime',
    value: 'system.uptime'
  },
  {
    display: 'Used disk space',
    value: 'vfs.fs.size[/,used]'
  },
  {
    display: 'Used swap space',
    value: 'system.swap.size[,used]'
  }
];

export const ZABBIX_METRICS_WITH_PROGRESS = [
  'system.cpu.util[,idle]',
  'vm.memory.size[available]',
  'system.swap.size[,used]',
  'jmx[\\"java.lang:type=Memory\\",\\"HeapMemoryUsage.used\\"]',
  'vfs.fs.size[/,used]'
];

export const ZABBIX_METRICS_WITH_MAX_VALUE = [
  'vm.memory.size[available]',
  'system.swap.size[,used]',
  'jmx[\\"java.lang:type=Memory\\",\\"HeapMemoryUsage.used\\"]',
  'vfs.fs.size[/,used]'
];

export const SONARQUBE_VERSIONS = [
  {
    display: '7.x',
    value: '7.x'
  },
  {
    display: '6.x',
    value: '6.x'
  },
  {
    display: '5.x',
    value: '5.x'
  }
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
  INVALID_PUBLIC_URL: () => 'Invalid Public URL',
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
  }),
  NEW_VERSION: action => ({
    type: 'info',
    message: 'New version available!',
    action
  }),
  CHANGE_CREDENTIALS_SUCCESS: userRole => ({
    type: 'success',
    message: `Account credentials for ${userRole} were changed, please log in`,
    duration: 3000
  }),
  CHANGE_CREDENTIALS_FAILED: message => ({
    type: 'error',
    message: message,
    duration: 3000
  })
};
