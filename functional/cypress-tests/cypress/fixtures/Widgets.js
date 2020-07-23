module.exports = {
  aemBundleInfo: {
    name: 'AEM Bundle Info',
    endpoint: 'endpoint1',
    schedulePeriod: '3',
    resolvedThreshold: '2',
    installedThreshold: '2',
    excludedBundles: ''
  },
  aemHealthcheck: {
    name: 'AEM Healthcheck',
    endpoint: 'endpoint1',
    schedulePeriod: '3',
    healthChecks: {
      activeBundles: {
        dataValue: 'inactiveBundles',
        label: 'Active Bundles'
      },
      asyncIndexHealthCheck: {
        dataValue: 'asyncIndexHealthCheck',
        label: 'Async Index Health Check'
      },
      codeCacheHealthCheck: {
        dataValue: 'codeCacheHealthCheck',
        label: 'Code Cache Health Check'
      },
      DiskSpaceHealthCheck: {
        dataValue: 'DiskSpaceHealthCheck',
        label: 'Disk Space'
      },
      logErrorHealthCheck: {
        dataValue: 'logErrorHealthCheck',
        label: 'Log Errors'
      },
      ObservationQueueLengthHealthCheck: {
        dataValue: 'ObservationQueueLengthHealthCheck',
        label: 'Observation Queue Length'
      },
      resourceSearchPathErrorHealthCheck: {
        dataValue: 'resourceSearchPathErrorHealthCheck',
        label: 'Resource Search Path Errors'
      },
      requestsStatus: {
        dataValue: 'requestsStatus',
        label: 'Request Performance'
      },
      queriesStatus: {
        dataValue: 'queriesStatus',
        label: 'Query Performance'
      },
      queryTraversalLimitsBundle: {
        dataValue: 'queryTraversalLimitsBundle',
        label: 'Query Traversal Limits'
      },
      securitychecks: {
        dataValue: 'securitychecks',
        label: 'Security Checks'
      },
      slingJobs: {
        dataValue: 'slingJobs',
        label: 'Sling Jobs'
      },
      slingDiscoveryOakSynchronizedClocks: {
        dataValue: 'slingDiscoveryOakSynchronizedClocks',
        label: 'Synchronized Clocks'
      },
      systemchecks: {
        dataValue: 'systemchecks',
        label: 'System Maintenance'
      }
    }
  },
  bambooDeployment: {
    name: 'Bamboo Deployment',
    endpoint: 'endpoint1',
    schedulePeriod: '3',
    id: '3'
  },
  bambooPlan: {
    name: 'Bamboo Plan',
    endpoint: 'endpoint1',
    schedulePeriod: '3',
    id: 'CGB-SCS'
  },
  checkbox: {
    name: 'Checkbox'
  },
  whiteSpace: {
    name: 'White Space'
  },
  iframeEmbed: {
    name: 'Iframe Embed',
    url: 'http://www.example.com/'
  },
  jenkinsJob: {
    name: 'Jenkins Job',
    endpoint: 'endpoint1',
    schedulePeriod: '3',
    path: '/job/CogBoard/job/in-progress'
  },
  jiraBuckets: {
    name: 'Jira Buckets',
    endpoint: 'endpoint1',
    schedulePeriod: '3',
    issueLimit: '50',
    bucketQueries: [
      {
        id: '9ca907f6-1d35-4e62-a344-dba02bc3c181',
        bucketName: 'New',
        jqlQuery: 'project%20%3D%20RND%20AND%20status%20%3D%20New'
      },
      {
        id: '064ad1e3-9df8-47ab-8ab0-7165ff579aad',
        bucketName: 'In progress',
        jqlQuery:
          'project%20%3D%20RND%20AND%20status%20in%20("In%20Progress"%2C%20"Code%20Review")'
      },
      {
        id: 'ffa24306-5048-4503-8952-d0dbda37dae1',
        bucketName: 'Done',
        jqlQuery: 'project%20%3D%20RND%20AND%20status%20%3D%20Resolved'
      }
    ]
  },
  serviceCheck: {
    name: 'Service Check',
    schedulePeriod: '3',
    requestMethod: 'GET',
    endpoint: 'endpoint1',
    path: '/service-check/post.json',
    requestBody: '{ "name": "cogboard-automation" }',
    responseBodyFragment: 'Expected string',
    expectedStatusCode: '200'
  },
  sonarQube5x: {
    name: 'SonarQube',
    version: '5.x',
    endpoint: 'endpoint1',
    schedulePeriod: '3',
    key: 'fail',
    id: '316488',
    metrics: {
      blocker_violations: {
        dataValue: 'blocker_violations',
        label: 'blocker violations',
        value: '0'
      },
      critical_violations: {
        dataValue: 'critical_violations',
        label: 'critical violations',
        value: '0'
      },
      major_violations: {
        dataValue: 'major_violations',
        label: 'major violations',
        value: '3'
      },
      minor_violations: {
        dataValue: 'minor_violations',
        label: 'minor violations',
        value: '4'
      },
      info_violations: {
        dataValue: 'info_violations',
        label: 'info violations',
        value: '15'
      },
      bugs: {
        dataValue: 'bugs',
        label: 'bugs',
        value: '7'
      },
      code_smells: {
        dataValue: 'code_smells',
        label: 'code smells',
        value: '5'
      },
      vulnerabilities: {
        dataValue: 'vulnerabilities',
        label: 'vulnerabilities',
        value: '3'
      }
    }
  },
  sonarQube6x: {
    name: 'SonarQube',
    version: '6.x',
    endpoint: 'endpoint1',
    schedulePeriod: '90',
    key: 'fail',
    metrics: {
      blocker_violations: {
        dataValue: 'blocker_violations',
        label: 'blocker violations',
        value: '0'
      },
      critical_violations: {
        dataValue: 'critical_violations',
        label: 'critical violations',
        value: '0'
      },
      major_violations: {
        dataValue: 'major_violations',
        label: 'major violations',
        value: '3'
      },
      minor_violations: {
        dataValue: 'minor_violations',
        label: 'minor violations',
        value: '4'
      },
      info_violations: {
        dataValue: 'info_violations',
        label: 'info violations',
        value: '15'
      },
      bugs: {
        dataValue: 'bugs',
        label: 'bugs',
        value: '7'
      },
      code_smells: {
        dataValue: 'code_smells',
        label: 'code smells',
        value: '5'
      },
      vulnerabilities: {
        dataValue: 'vulnerabilities',
        label: 'vulnerabilities',
        value: '3'
      }
    }
  },
  sonarQube7x: {
    name: 'SonarQube',
    version: '7.x',
    endpoint: 'endpoint1',
    schedulePeriod: '3',
    key: 'fail',
    metrics: {
      blocker_violations: {
        dataValue: 'blocker_violations',
        label: 'blocker violations',
        value: '0'
      },
      critical_violations: {
        dataValue: 'critical_violations',
        label: 'critical violations',
        value: '0'
      },
      major_violations: {
        dataValue: 'major_violations',
        label: 'major violations',
        value: '3'
      },
      minor_violations: {
        dataValue: 'minor_violations',
        label: 'minor violations',
        value: '4'
      },
      info_violations: {
        dataValue: 'info_violations',
        label: 'info violations',
        value: '15'
      },
      bugs: {
        dataValue: 'bugs',
        label: 'bugs',
        value: '7'
      },
      code_smells: {
        dataValue: 'code_smells',
        label: 'code smells',
        value: '5'
      },
      vulnerabilities: {
        dataValue: 'vulnerabilities',
        label: 'vulnerabilities',
        value: '3'
      }
    }
  },
  text: {
    name: 'Text',
    text: 'Checking Text Widget Adding',
    textSize: 'h5',
    verticalText: true
  },
  worldClock: {
    name: 'World Clock',
    timezone: 'GMT+2',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm:ss',
    displayDate: true,
    displayTime: true,
    textsize: 'h6'
  }
};
