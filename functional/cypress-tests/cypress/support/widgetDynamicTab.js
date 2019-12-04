import Widgets from "../fixtures/Widgets";

function randomBoolean() {
  return Math.random() >= 0.5;
}

export function fillAemHealthcheck() {
  cy.get('[data-cy="widget-form-endpoint-input"]').click();
  //Change selector (add data-cy in markup)
  cy.get(`[data-value="${Widgets.aemHealthcheck.endpoint}"]`).click();
  cy.fillSchedulePeriod(Widgets.aemHealthcheck.schedulePeriod);
  cy.get('[data-cy="widget-form-selected-health-checks-input"]').click();
  //Change selector (add data-cy in markup)
  cy.contains(
    "span",
    `${Widgets.aemHealthcheck.healthChecks.ObservationQueueLengthHealthCheck.label}`
  )
    .click()
    .type("{esc}");
}

export function fillBambooPlan() {
  cy.get('[data-cy="widget-form-endpoint-input"]').click();
  //Change selector (add data-cy in markup)
  cy.get(`[data-value="${Widgets.bambooPlan.endpoint}"]`).click();
  cy.fillSchedulePeriod(Widgets.bambooPlan.schedulePeriod);
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
  //To Do: Choose endpoint
  cy.fillSchedulePeriod(Widgets.jenkinsJob.schedulePeriod);
  cy.get('[data-cy="widget-form-path-input"]').type(Widgets.jenkinsJob.path);
}

export function fillServiceCheck() {
  cy.fillSchedulePeriod(Widgets.serviceCheck.schedulePeriod);
  cy.get('[data-cy="widget-form-request-method-input"]').click();
  //Change selector (add data-cy in markup)
  cy.get('[data-value="post"]').click();
  cy.get('[data-cy="widget-form-path-input"]').type(Widgets.serviceCheck.path);
  //To Do: request body and response body filling
  cy.get('[data-cy="widget-form-expected-status-code-input"]').type(
    "{selectall}" + Widgets.serviceCheck.expectedStatusCode
  );
}

export function fillSonarQube() {
  cy.get('[data-cy="widget-form-endpoint-input"]').click();
  //Change selector (add data-cy in markup)
  cy.get(`[data-value="${Widgets.sonarQube.endpoint}"]`).click();
  cy.fillSchedulePeriod(Widgets.sonarQube.schedulePeriod);
  cy.get('[data-cy="widget-form-key-string-input"]').type(
    Widgets.sonarQube.key
  );
  cy.get('[data-cy="widget-form-id-number-input"]').type(Widgets.sonarQube.id);
  //To Do: Choosing metrics
}

export function fillText() {
  cy.get('[data-cy="widget-form-text-input"]').type(Widgets.text.text);
  cy.get('[data-cy="widget-form-text-size-input"]').click();
  //Change selector (add data-cy in markup)
  cy.get('[data-value="h3"]').click();
  if (randomBoolean()) {
    cy.get('[data-cy="widget-form-is-vertical-input"]').click();
  }
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
  if (randomBoolean()) {
    cy.get('[data-cy="widget-form-display-date-input"]').click();
  }
  if (randomBoolean()) {
    cy.get('[data-cy="widget-form-display-time-input"]').click();
  }
  cy.get('[data-cy="widget-form-text-size-input"]').click();
  //Change selector (add data-cy in markup)
  cy.get(`[data-value="${Widgets.worldClock.textsize}"]`).click();
}

export function fillDynamicTab(type = "Text") {
  if (type !== "Default" && type !== "Checkbox") {
    console.log(type);
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
