import Widgets from "../fixtures/Widgets";

export function fillAemBundleInfo() {
  cy.get('[data-cy="widget-form-endpoint-input"]').click();
  cy.get(`[data-value="${Widgets.aemBundleInfo.endpoint}"]`).click();
  cy.fillSchedulePeriod(Widgets.aemBundleInfo.schedulePeriod);
  cy.get('[data-cy="widget-form-resolved-threshold-input"]').type(
    "{selectall}" + `${Widgets.aemBundleInfo.resolvedThreshold}`
  );
  cy.get('[data-cy="widget-form-installed-threshold-input"]').type(
    "{selectall}" + `${Widgets.aemBundleInfo.installedThreshold}`
  );
  cy.get('[data-cy="widget-form-excluded-bundles-input"]').type(
    "{selectall}" + `${Widgets.aemBundleInfo.excludedBundles}`
  );
}

export function fillAemHealthcheck() {
  const healthcheckKeys = Object.keys(Widgets.aemHealthcheck.healthChecks);
  cy.get('[data-cy="widget-form-endpoint-input"]').click();
  cy.get(`[data-value="${Widgets.aemHealthcheck.endpoint}"]`).click();
  cy.fillSchedulePeriod(Widgets.aemHealthcheck.schedulePeriod);
  cy.get('[data-cy="widget-form-selected-health-checks-input"]').click();
  for (let i = 0; i < healthcheckKeys.length - 1; i++) {
    const healthcheck = healthcheckKeys[i];
    const label = Widgets.aemHealthcheck.healthChecks[healthcheck].label;
    if ((i > 0 && i < 3) || (i > 3 && i < 11)) {
      cy.contains("span", `${label}`).click();
    } else if (i == 12) {
      cy.contains("span", `${label}`).type("{esc}");
    }
  }
}

export function fillBambooDeployment() {
  cy.get('[data-cy="widget-form-endpoint-input"]').click();
  cy.get(`[data-value="${Widgets.bambooDeployment.endpoint}"]`).click();
  cy.fillSchedulePeriod(Widgets.bambooDeployment.schedulePeriod);
  cy.get('[data-cy="widget-form-id-string-input"]').type(
    "{selectall}" + Widgets.bambooDeployment.id
  );
}

export function fillBambooPlan() {
  cy.get('[data-cy="widget-form-endpoint-input"]').click();
  cy.get(`[data-value="${Widgets.bambooPlan.endpoint}"]`).click();
  cy.fillSchedulePeriod(Widgets.bambooPlan.schedulePeriod);
  cy.get('[data-cy="widget-form-id-string-input"]').type(Widgets.bambooPlan.id);
}

export function fillExample() {
  cy.fillSchedulePeriod(Widgets.example.schedulePeriod);
}

export function fillIframeEmbed() {
  cy.get('[data-cy="widget-form-iframe-url-input"]').type(
    Widgets.iframeEmbed.url
  );
}

export function fillJenkinsJob() {
  cy.get('[data-cy="widget-form-endpoint-input"]').click();
  cy.get(`[data-value="${Widgets.jenkinsJob.endpoint}"]`).click();
  cy.fillSchedulePeriod(Widgets.jenkinsJob.schedulePeriod);
  cy.get('[data-cy="widget-form-path-input"]').type(Widgets.jenkinsJob.path);
}

export function fillServiceCheck() {
  cy.fillSchedulePeriod(Widgets.serviceCheck.schedulePeriod);
  cy.get('[data-cy="widget-form-request-method-input"]').click();
  cy.get('[data-value="post"]').click();
  cy.get('[data-cy="widget-form-endpoint-input"]').click();
  cy.get(`[data-value="${Widgets.serviceCheck.endpoint}"]`).click();
  cy.get('[data-cy="widget-form-path-input"]').type(Widgets.serviceCheck.path);
  cy.get('[data-cy="widget-form-body-input"]').type(
    Widgets.serviceCheck.requestBody,
    { parseSpecialCharSequences: false }
  );
  cy.get('[data-cy="widget-form-expected-response-body-input"]').type(
    Widgets.serviceCheck.responseBodyFragment
  );
  cy.get('[data-cy="widget-form-expected-status-code-input"]').type(
    "{selectall}" + Widgets.serviceCheck.expectedStatusCode
  );
}

export function fillSonarQube5x() {
  const metricKeys = Object.keys(Widgets.sonarQube5x.metrics);
  cy.get('[data-cy="widget-form-sonar-qube-version-input"]').click();
  cy.contains("li", `${Widgets.sonarQube5x.version}`).click();
  cy.get('[data-cy="widget-form-endpoint-input"]').click();
  cy.get(`[data-value="${Widgets.sonarQube5x.endpoint}"]`).click();
  cy.fillSchedulePeriod(Widgets.sonarQube5x.schedulePeriod);
  cy.get('[data-cy="widget-form-key-string-input"]').type(
    Widgets.sonarQube5x.key
  );
  cy.get('[data-cy="widget-form-id-number-input"]').type(
    "{selectall}" + `${Widgets.sonarQube5x.id}`
  );
  cy.get('[data-cy="widget-form-selected-metrics-input"]').click();
  for (let i = 4; i < metricKeys.length; i++) {
    const metric = metricKeys[i];
    const dataValue = Widgets.sonarQube5x.metrics[metric].dataValue;
    if (i == metricKeys.length - 1) {
      cy.get(`[data-value="${dataValue}"]`).type("{esc}");
    } else {
      cy.get(`[data-value="${dataValue}"]`).click();
    }
  }
}

export function fillSonarQube7x() {
  const metricKeys = Object.keys(Widgets.sonarQube7x.metrics);
  cy.get('[data-cy="widget-form-sonar-qube-version-input"]').click();
  cy.contains("li", `${Widgets.sonarQube7x.version}`).click();
  cy.get('[data-cy="widget-form-endpoint-input"]').click();
  cy.get(`[data-value="${Widgets.sonarQube7x.endpoint}"]`).click();
  cy.fillSchedulePeriod(Widgets.sonarQube7x.schedulePeriod);
  cy.get('[data-cy="widget-form-key-string-input"]').type(
    Widgets.sonarQube7x.key
  );
  cy.get('[data-cy="widget-form-selected-metrics-input"]').click();
  for (let i = 4; i < metricKeys.length; i++) {
    const metric = metricKeys[i];
    const dataValue = Widgets.sonarQube7x.metrics[metric].dataValue;
    if (i == metricKeys.length - 1) {
      cy.get(`[data-value="${dataValue}"]`).type("{esc}");
    } else {
      cy.get(`[data-value="${dataValue}"]`).click();
    }
  }
}

export function fillText() {
  cy.get('[data-cy="widget-form-text-input"]').type(Widgets.text.text);
  cy.get('[data-cy="widget-form-text-size-input"]').click();
  cy.get('[data-value="h3"]').click();
}

export function fillWorldClock() {
  cy.get('[data-cy="widget-form-time-zone-id-input"]').click();
  cy.contains(Widgets.worldClock.timezone).click();
  cy.get('[data-cy="widget-form-date-format-input"]').click();
  //Change selector (add data-cy in markup)
  cy.get(`[data-value="${Widgets.worldClock.dateFormat}"]`).click();
  cy.get('[data-cy="widget-form-time-format-input"]').click();
  //Change selector (add data-cy in markup)
  cy.get(`[data-value="${Widgets.worldClock.timeFormat}"]`).click();
  cy.get('[data-cy="widget-form-text-size-input"]').click();
  //Change selector (add data-cy in markup)
  cy.get(`[data-value="${Widgets.worldClock.textsize}"]`).click();
}

export function fillDynamicTab(type = "Text", version = "") {
  const name = `${type}${version}`;
  if (name !== "White Space" && name !== "Checkbox") {
    cy.get('[data-cy="widget-form-dynamic-tab"]').click();
    switch (name) {
      case "AEM Bundle Info":
        fillAemBundleInfo();
        break;
      case "AEM Healthcheck":
        fillAemHealthcheck();
        break;
      case "Bamboo Deployment":
        fillBambooDeployment();
        break;
      case "Bamboo Plan":
        fillBambooPlan();
        break;
      case "Example":
        fillExample();
        break;
      case "Iframe Embed":
        fillIframeEmbed();
        break;
      case "Jenkins Job":
        fillJenkinsJob();
        break;
      case "Service Check":
        fillServiceCheck();
        break;
      case "SonarQube 5.x":
        fillSonarQube5x();
        break;
      case "SonarQube 7.x":
        fillSonarQube7x();
        break;
      case "Text":
        fillText();
        break;
      case "World Clock":
        fillWorldClock();
        break;
      default:
        break;
    }
  }
}
