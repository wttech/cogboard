module.exports = {
  aemBundleInfo: {
    name: "AEM Bundle Info",
    endpoint: "endpoint1",
    schedulePeriod: "3",
    resolvedThreshold: "2",
    installedThreshold: "2",
    excludedBundles: ""
  },
  aemHealthcheck: {
    name: "AEM Healthcheck",
    endpoint: "endpoint1",
    schedulePeriod: "500",
    healthChecks: {
      activeBundles: {
        dataValue: "inactiveBundles",
        label: "Active Bundles"
      },
      asyncIndexHealthCheck: {
        dataValue: "asyncIndexHealthCheck",
        label: "Async Index Health Check"
      },
      codeCacheHealthCheck: {
        dataValue: "codeCacheHealthCheck",
        label: "Code Cache Health Check"
      },
      DiskSpaceHealthCheck: {
        dataValue: "DiskSpaceHealthCheck",
        label: "Disk Space"
      },
      logErrorHealthCheck: {
        dataValue: "logErrorHealthCheck",
        label: "Log Errors"
      },
      ObservationQueueLengthHealthCheck: {
        dataValue: "ObservationQueueLengthHealthCheck",
        label: "Observation Queue Length"
      },
      resourceSearchPathErrorHealthCheck: {
        dataValue: "resourceSearchPathErrorHealthCheck",
        label: "Resource Search Path Errors"
      },
      requestsStatus: {
        dataValue: "requestsStatus",
        label: "Request Performance"
      },
      queriesStatus: {
        dataValue: "queriesStatus",
        label: "Query Performance"
      },
      queryTraversalLimitsBundle: {
        dataValue: "queryTraversalLimitsBundle",
        label: "Query Traversal Limits"
      },
      securitychecks: {
        dataValue: "securitychecks",
        label: "Security Checks"
      },
      slingJobs: {
        dataValue: "slingJobs",
        label: "Sling Jobs"
      },
      slingDiscoveryOakSynchronizedClocks: {
        dataValue: "slingDiscoveryOakSynchronizedClocks",
        label: "Synchronized Clocks"
      },
      systemchecks: {
        dataValue: "systemchecks",
        label: "System Maintenance"
      }
    }
  },
  bambooDeployment: {
    name: "Bamboo Deployment",
    endpoint: "endpoint1",
    schedulePeriod: "500",
    id: "33333333"
  },
  bambooPlan: {
    name: "Bamboo Plan",
    endpoint: "endpoint1",
    schedulePeriod: "500",
    id: "CGB-SCS"
  },
  checkbox: {
    name: "Checkbox"
  },
  whiteSpace: {
    name: "White Space"
  },
  example: {
    name: "Example",
    schedulePeriod: "100"
  },
  iframeEmbed: {
    name: "Iframe Embed",
    url: "http://www.example.com/"
  },
  jenkinsJob: {
    name: "Jenkins Job",
    endpoint: "endpoint1",
    schedulePeriod: "500",
    path: "/job/CogBoard/job/in-progress"
  },
  serviceCheck: {
    name: "Service Check",
    schedulePeriod: "60",
    requestMethod: "GET",
    endpoint: "endpoint1",
    path: "/service-check/post.json",
    requestBody: '{ "name": "cogboard-automation" }',
    responseBodyFragment: "Expected string",
    expectedStatusCode: "200"
  },
  sonarQube5x: {
    name: "SonarQube",
    version: "5.x",
    endpoint: "endpoint1",
    schedulePeriod: "90",
    key: "fail",
    id: "316488",
    metrics: {
      blocker_violations: {
        dataValue: "blocker_violations",
        label: "blocker violations",
        value: "0"
      },
      critical_violations: {
        dataValue: "critical_violations",
        label: "critical violations",
        value: "0"
      },
      major_violations: {
        dataValue: "major_violations",
        label: "major violations",
        value: "3"
      },
      minor_violations: {
        dataValue: "minor_violations",
        label: "minor violations",
        value: "4"
      },
      info_violations: {
        dataValue: "info_violations",
        label: "info violations",
        value: "15"
      },
      bugs: {
        dataValue: "bugs",
        label: "bugs",
        value: "7"
      },
      code_smells: {
        dataValue: "code_smells",
        label: "code smells",
        value: "5"
      },
      vulnerabilities: {
        dataValue: "vulnerabilities",
        label: "vulnerabilities",
        value: "3"
      }
    }
  },
  sonarQube7x: {
    name: "SonarQube",
    version: "7.x",
    endpoint: "endpoint1",
    schedulePeriod: "90",
    key: "fail",
    metrics: {
      blocker_violations: {
        dataValue: "blocker_violations",
        label: "blocker violations",
        value: "0"
      },
      critical_violations: {
        dataValue: "critical_violations",
        label: "critical violations",
        value: "0"
      },
      major_violations: {
        dataValue: "major_violations",
        label: "major violations",
        value: "3"
      },
      minor_violations: {
        dataValue: "minor_violations",
        label: "minor violations",
        value: "4"
      },
      info_violations: {
        dataValue: "info_violations",
        label: "info violations",
        value: "15"
      },
      bugs: {
        dataValue: "bugs",
        label: "bugs",
        value: "7"
      },
      code_smells: {
        dataValue: "code_smells",
        label: "code smells",
        value: "5"
      },
      vulnerabilities: {
        dataValue: "vulnerabilities",
        label: "vulnerabilities",
        value: "3"
      }
    }
  },
  text: {
    name: "Text",
    text: "Checking Text Widget Adding",
    textSize: "h5",
    verticalText: true
  },
  worldClock: {
    name: "World Clock",
    timezone: "GMT+2",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "HH:mm:ss",
    displayDate: true,
    displayTime: true,
    textsize: "h6"
  }
};
