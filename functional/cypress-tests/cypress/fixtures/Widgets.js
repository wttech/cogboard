module.exports = {
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
  bambooPlan: {
    name: "Bamboo Plan",
    endpoint: "endpoint1",
    schedulePeriod: "500",
    id: "CGB-SCS"
  },
  checkbox: {
    name: "Checkbox"
  },
  default: {
    name: "Default"
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
  sonarQube: {
    name: "SonarQube",
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
