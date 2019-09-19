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
  systemchecks: 'System Maintenance',
};
