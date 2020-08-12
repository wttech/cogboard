import { createWidget } from '../support/widget';
import Widgets from '../fixtures/Widgets';

describe('Refresh widgets', () => {

  const jenkinsJobTitleFirst = 'Jenkins Job';
  let jenkinsJobWidget1;

  beforeEach(() => {
    cy.visit('/');
    cy.login();

    jenkinsJobWidget1 = createJenkinsJobWidget(jenkinsJobTitleFirst);
    cy.saveState();
  });

  it('Widget will be updated after edit endpoints', () => {
    jenkinsJobWidget1.assertColor('rgb(25, 140, 189)');

    changeUrls('http://fake-mocks:1234');
    jenkinsJobWidget1.assertColor('rgb(225, 49, 47)');

    changeUrls('http://api-mocks:8080');
    jenkinsJobWidget1.assertColor('rgb(25, 140, 189)');

    jenkinsJobWidget1.remove();
    cy.saveState();
  });

  function changeUrls(url) {
    cy.openSettings();
    cy.contains('li.MuiListItem-container', 'API Mocks Endpoint')
      .find('[data-cy="edit-endpoint-edit-button"]')
      .click();
    cy.get('[data-cy="endpoint-form-url-input"]')
      .clear()
      .type(url)
      .blur();
    cy.get('[data-cy="endpoint-form-public-url-input"]')
      .clear()
      .type(url)
      .blur();
    cy.get('[data-cy="endpoint-form-submit-button"]')
      .click();
    cy.get('[data-cy="settings-menu-exit-button"]')
      .click();
  }

  function createJenkinsJobWidget(title) {
    cy.clickAddWidgetButton();
    const widget = createWidget(Widgets.jenkinsJob.name);
    widget.title = title;
    widget.configure(false);
    return widget;
  }

});