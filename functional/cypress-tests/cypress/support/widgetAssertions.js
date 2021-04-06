import Widgets from '../fixtures/Widgets';

export function validateAemBundleInfo(widget) {
  widget
    .assertText('p', /^Total: [0-9]{1,4}/)
    .assertText('p', /^Active: [0-9]{1,4}/)
    .assertText('p', /^Fragmented: [0-9]{1,4}/)
    .assertText('p', /^Resolved: [0-9]{1,4}/)
    .assertText('p', /^Installed: [0-9]{1,4}/);
}

export function validateAemHealthcheck(widget) {
  const healthcheckKeys = Object.keys(Widgets.aemHealthcheck.healthChecks);

  for (let i = 0; i < healthcheckKeys.length; i++) {
    const label = Widgets.aemHealthcheck.healthChecks[healthcheckKeys[i]].label;
    widget.assertText('p', label, 'to.exist');
  }
}

export function validateBambooDeployment(widget) {
  widget
    .assertBackground('rgb(25, 140, 189)')
    .assertText('p', /^Deployment: IN_PROGRESS/)
    .assertText('p', /^Lifecycle: IN_PROGRESS/)
    .assertText('p', '3.1.43-SNAPSHOT (129)');
}

export function validateBambooPlan(widget) {
  widget
    .assertBackground('rgb(1, 148, 48)')
    .assertText('p', 'Finished')
    .assertText('p', '#1597');
}

export function validateCheckbox(widget) {
  cy.wait(2000);
  widget.click('[data-cy="checkbox"]');
  cy.wait(2000);
  widget.assertBackground('rgb(1, 148, 48)');
  widget.click('[data-cy="checkbox"]');
  cy.wait(2000);
  widget.assertBackground('rgb(225, 49, 47)');
  widget.click('[data-cy="checkbox"]');
  cy.wait(2000);
  widget.assertBackground('rgb(38, 36, 62)');
}

export function validateIframeEmbed(widget) {
  widget.elementVisible('iframe');
}

export function validateJenkinsJob(widget) {
  widget
    .assertText('p', '#6')
    .assertText(
      'p',
      /[0-9]{2}[.|/][0-9]{2}[.|/][0-9]{4}, [0-9][0-9]?:[0-9]{2}:[0-9]{2}/
    )
    .assertText('p', '0.25 [s]')
    .assertText('p', 'master-branch');
}

export function validateJiraBuckets(widget) {
  widget
    .assertText('td', 'New')
    .assertText('td', '2')
    .assertText('td', 'In progress')
    .assertText('td', '4')
    .assertText('td', 'Done')
    .assertText('td', '15')
    .assertBackground('rgb(38, 36, 62)');
}

export function validateLinkList(widget) {
  const linkListItems = Widgets.linkList.linkListItems;
  for (let i = 0; i < linkListItems.length; i++) {
    const title = linkListItems[i].linkTitle;
    const url = linkListItems[i].linkUrl;

    widget.assertText('a', title);
    cy.get(`#link-${i}`)
      .should('have.prop', 'href')
      .and('equal', `${url}/`);
  }
}

export function validateServiceCheck(widget) {
  widget
    .assertBackground('rgb(1, 148, 48)')
    .assertText('p', 'MATCH')
    .assertText('span', `${Widgets.serviceCheck.expectedStatusCode}`);
}

export function validateSonarQube5x(widget) {
  const metricKeys = Object.keys(Widgets.sonarQube5x.metrics);
  for (let i = 0; i < metricKeys.length; i++) {
    const metric = metricKeys[i];
    const label = Widgets.sonarQube5x.metrics[metric].label;
    widget.assertText('p', label);
  }
  cy.contains('h3', widget.title)
    .parents('[draggable="true"]')
    .contains(
      'p',
      /[0-9]{1,2}.[0-9]{1,2}.[0-9]{4}, [0-9]{1,2}.[0-9]{1,2}.[0-9]{1,2}/
    )
    .should('is.visible');
}

export function validateSonarQube7x(widget) {
  const metricKeys = Object.keys(Widgets.sonarQube7x.metrics);
  for (let i = 0; i < metricKeys.length; i++) {
    const metric = metricKeys[i];
    const label = Widgets.sonarQube7x.metrics[metric].label;
    widget.assertText('p', label);
  }
}

export function validateText(widget) {
  widget.assertText('h3', Widgets.text.text);
}

export function validateToDoList(widget) {
  const listItems = Object.keys(Widgets.toDoList.toDoListItems);
  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];
    const itemTitle = Widgets.toDoList.toDoListItems[item].itemText;

    widget
      .scrollToElement(`[data-cy="item-unchecked-${i}"]`)
      .assertText('span', itemTitle, 'to.exist')
      .isChecked(`[data-cy="item-unchecked-${i}"]`, false);
  }

  widget
    .isChecked(`[data-cy="item-unchecked-0"]`, false)
    .click(`[data-cy="item-unchecked-0"]`);

  cy.wait(100);
  widget.isChecked(`[data-cy="item-checked-0"]`, true);
}

export function validateWhiteSpace(widget) {
  widget.assertColor('rgb(255, 255, 255)');
}

export function validateWorldClock(widget) {
  widget.assertText('h6', /^[0-9]{2}:[0-9]{2}:[0-9]{4}\/[0-9]{2}\/[0-9]{4}/);
}

export function validateWidgetConfig(widget) {
  const name =
    widget.version !== undefined
      ? `${widget.name} ${widget.version}`
      : widget.name;

  widget.assertTitle();

  switch (name) {
    case 'AEM Bundle Info':
      validateAemBundleInfo(widget);
      break;
    case 'AEM Healthcheck':
      validateAemHealthcheck(widget);
      break;
    case 'Bamboo Deployment':
      validateBambooDeployment(widget);
      break;
    case 'Bamboo Plan':
      validateBambooPlan(widget);
      break;
    case 'Checkbox':
      validateCheckbox(widget);
      break;
    case 'Iframe Embed':
      validateIframeEmbed(widget);
      break;
    case 'Jenkins Job':
      validateJenkinsJob(widget);
      break;
    case 'Jira Buckets':
      validateJiraBuckets(widget);
      break;
    case 'Link List':
      validateLinkList(widget);
      break;
    case 'Service Check':
      validateServiceCheck(widget);
      break;
    case 'SonarQube 5.x':
      validateSonarQube5x(widget);
      break;
    case 'SonarQube 7.x':
      validateSonarQube7x(widget);
      break;
    case 'Text':
      validateText(widget);
      break;
    case 'ToDo List':
      validateToDoList(widget);
      break;
    case 'White Space':
      validateWhiteSpace(widget);
      break;
    case 'World Clock':
      validateWorldClock(widget);
      break;
    default:
      break;
  }
}
