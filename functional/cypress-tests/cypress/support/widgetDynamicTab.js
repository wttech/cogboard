import Widgets from "../fixtures/Widgets";

export function fillAemHealthcheck() {
  let healthcheckKeys = Object.keys(Widgets.aemHealthcheck.healthChecks);
  cy.get('[data-cy="widget-form-endpoint-input"]').click();
  cy.get(`[data-value="${Widgets.aemHealthcheck.endpoint}"]`).click();
  cy.fillSchedulePeriod(Widgets.aemHealthcheck.schedulePeriod);
  cy.get('[data-cy="widget-form-selected-health-checks-input"]').click();
  for (let i = 0; i < healthcheckKeys.length - 1; i++) {
    let healthcheck = healthcheckKeys[i];
    let label = Widgets.aemHealthcheck.healthChecks[healthcheck].label;
    if (i == 0 || i == 3 || i == 11) {
    } else if (i == 12) {
      cy.contains("span", `${label}`).type("{esc}");
    } else {
      cy.contains("span", `${label}`).click();
    }
  }
}

export function fillBambooPlan() {
  cy.get('[data-cy="widget-form-endpoint-input"]').click();
  //Change selector (add data-cy in markup)
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

export function fillSonarQube() {
  let metricKeys = Object.keys(Widgets.sonarQube.metrics);
  cy.get('[data-cy="widget-form-endpoint-input"]').click();
  cy.get(`[data-value="${Widgets.sonarQube.endpoint}"]`).click();
  cy.fillSchedulePeriod(Widgets.sonarQube.schedulePeriod);
  cy.get('[data-cy="widget-form-key-string-input"]').type(
    Widgets.sonarQube.key
  );
  cy.get('[data-cy="widget-form-id-number-input"]').type(Widgets.sonarQube.id);
  cy.get('[data-cy="widget-form-selected-metrics-input"]').click();
  for (let i = 4; i < metricKeys.length; i++) {
    let metric = metricKeys[i];
    let dataValue = Widgets.sonarQube.metrics[metric].dataValue;
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

export function fillDynamicTab(type = "Text") {
  if (type !== "Default" && type !== "Checkbox") {
    cy.get('[data-cy="widget-form-dynamic-tab"]').click();
    switch (type) {
      case "AEM Healthcheck":
        fillAemHealthcheck();
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
      case "SonarQube":
        fillSonarQube();
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
