module.exports = {
	aemHealthcheck: {
		name: "AEM Healthcheck",
		endpoint: "endpoint1",
		schedulePeriod: "500",
		healthChecks: {
			activeBundles: {
				dataValue: "inactiveBundles",
				label: "Active Bundles",
			},
			asyncIndexHealthCheck: {
				dataValue: "asyncIndexHealthCheck",
				label: "Async Index Health Check",
			},
			codeCacheHealthCheck: {
				dataValue: "codeCacheHealthCheck",
				label: "Code Cache Health Check",
			},
			DiskSpaceHealthCheck: {
				dataValue: "DiskSpaceHealthCheck",
				label: "Disk Space",
			},
			logErrorHealthCheck: {
				dataValue: "logErrorHealthCheck",
				label: "Log Errors",
			},
			ObservationQueueLengthHealthCheck: {
				dataValue: "ObservationQueueLengthHealthCheck",
				label: "Observation Queue Length",
			},
			resourceSearchPathErrorHealthCheck: {
				dataValue: "resourceSearchPathErrorHealthCheck",
				label: "Resource Search Path Errors",
			},
			requestsStatus: {
				dataValue: "requestsStatus",
				label: "Requests Performance",
			},
			queriesStatus: {
				dataValue: "queriesStatus",
				label: "Query Performance",
			},
			queryTraversalLimitsBundle: {
				dataValue: "queryTraversalLimitsBundle",
				label: "Query Traversal Limits",
			},
			securitychecks: {
				dataValue: "securitychecks",
				label: "Security Checks",
			},
			slingJobs: {
				dataValue: "slingJobs",
				label: "Sling Jobs",
			},
			slingDiscoveryOakSynchronizedClocks: {
				dataValue: "slingDiscoveryOakSynchronizedClocks",
				label: "Synchronized Clocks",
			},
			systemchecks: {
				dataValue: "systemchecks",
				label: "System Maintenance",
			},
		},
	},
	bambooEnvironmentDeployment: {
		name: "Bamboo Environment Deployment",
		endpoint: "endpoint1",
		schedulePeriod: "500",
		id: "",
	},
	bambooPlan: {
		name: "Bamboo Plan",
		endpoint: "endpoint1",
		schedulePeriod: "500",
		id: "bamboo-test",
	},
	checkbox: {
		name: "Checkbox",
	},
	default: {
		name: "Default",
	},
	example: {
		name: "Example",
		schedulePeriod: "100",
	},
	iframeEmbed: {
		name: "Iframe Embed",
		url: "http://example.com/",
	},
	jenkinsJob: {
		name: "Jenkins Job",
		endpoint: "endpoint1",
		schedulePeriod: "500",
		path: "somepath",
	},
	serviceCheck: {
		name: "Service Check",
		schedulePeriod: "60",
		requestMethod: "POST",
		endpoint: "endpoint1",
		path: "api/v1/create",
		requestBody: '{"name":"cogboard-automation", "salary": "12345", "age": "1"}',
		responseBodyFragment: "cogboard-automation",
		expectedStatusCode: "200",
	},
	sonarQube: {
		name: "SonarQube",
		endpoint: "endpoint1",
		schedulePeriod: "90",
		key: "rand",
		id: "1",
		metrics: {
			blocker_violations: {
				dataValue: "blocker_violations",
				label: "blocker_violations",
			},
			critical_violations: {
				dataValue: "critical_violations",
				label: "critical_violations",
			},
			major_violations: {
				dataValue: "major_violations",
				label: "major_violations",
			},
			minor_violations: {
				dataValue: "minor_violations",
				label: "minor_violations",
			},
			info_violations: {
				dataValue: "info_violations",
				label: "info_violations",
			},
			bugs: {
				dataValue: "bugs",
				label: "bugs",
			},
			code_smells: {
				dataValue: "code_smells",
				label: "code_smells",
			},
			vulnerabilities: {
				dataValue: "vulnerabilities",
				label: "vulnerabilities",
			},
		},
	},
	text: {
		name: "Text",
		text: "Checking Text Widget Adding",
		textSize: "h5",
		verticalText: true,
	},
	worldClock: {
		name: "World Clock",
		timezone: "GMT+2",
		dateFormat: "dddd, Do MMMM YYYY",
		timeFormat: "h:mm:ss a",
		displayDate: true,
		displayTime: true,
		textsize: "h6",
	}
}