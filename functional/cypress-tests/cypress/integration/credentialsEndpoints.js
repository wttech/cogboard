/// <reference types="Cypress" />
import {
  testCredentials,
  testEndpoint,
  testEndpointByIp,
  badEndpoint,
  badCredentials,
  ENDPOINT_LABEL_PREFIX,
  CREDENTIAL_LABEL_PREFIX
} from '../fixtures/credentialsEndpoints';
import { addEndpoint, loadEndpoint } from '../support/endpoint';
import { addCredentials, loadCredentials } from '../support/credential';

describe('Credentials and endpoints', () => {
  const uid = Date.now().toString();

  before(() => {
    cy.getAuthenticationToken().then(token => {
      cy.setTestCredentials(JSON.stringify(testCredentials(uid)), token);
    });
  });

  context('Anonymous user', () => {
    it('Anonymous user: settings menu button is not available', () => {
      cy.visit('/');
      cy.get('[data-cy="settings-menu-open-button"]').should('not.be.visible');
    });
  });

  context('Logged in user - general check', () => {
    beforeEach(() => {
      cy.openSettings();
    });

    it('Logged-in user: settings panel is available with its elements', () => {
      cy.get('[data-cy="app-dialog-title"]')
        .find('h2')
        .should('have.text', 'Settings');
      cy.get('button[aria-selected="true"]').should('have.text', 'Endpoints');
      cy.get('[data-cy="add-endpoint-add-button"]').should('exist');

      cy.get('[data-cy="settings-menu-credentials-tab"]').click();

      cy.get('[data-cy="app-dialog-title"]')
        .find('h2')
        .should('have.text', 'Settings');
      cy.get('button[aria-selected="true"]').should('have.text', 'Credentials');
      cy.get('[data-cy="add-credential-add-button"]').should('exist');

      cy.get('[data-cy="settings-menu-endpoints-tab"]').click();

      cy.get('[data-cy="app-dialog-title"]')
        .find('h2')
        .should('have.text', 'Settings');
      cy.get('button[aria-selected="true"]').should('have.text', 'Endpoints');
      cy.get('[data-cy="add-endpoint-add-button"]').should('exist');
    });

    it('User can switch to add new credential form directly from add new endpoint form', () => {
      cy.get('[data-cy="add-endpoint-add-button"]').click();
      cy.get('[data-cy="add-credential-add-button-small"]').click();
      cy.contains('[data-cy="app-dialog-title"]', 'Add new credential').should(
        'exist'
      );
    });
  });

  context('Logged in user - endpoints', () => {
    beforeEach(() => {
      cy.openSettings();
    });

    it('Error messages are displayed when config is bad', () => {
      addEndpoint(badEndpoint())
        .applyConfig()
        .save()
        .assertErrorMessageVisible('This field is required')
        .assertErrorMessageVisible('Invalid URL')
        .assertErrorMessageVisible('Invalid Public URL');
    });

    it('User can add new endpoint. New endpoints label is visible', () => {
      addEndpoint(testEndpoint(uid))
        .applyConfig()
        .save()
        .assertExists();
    });

    it('User can add new endpoint by IP. New endpoints label is visible', () => {
      addEndpoint(testEndpointByIp(uid))
        .applyConfig()
        .save()
        .assertExists();
    });

    it('User cannot add endpoints with existing label', () => {
      // adding the same endpoint for the second time
      addEndpoint(testEndpoint(uid))
        .applyConfig()
        .assertErrorMessageVisible('This field must be unique.');
    });

    it('User can edit existing endpoint', () => {
      const config = testEndpoint(uid);
      const newConfig = testEndpoint('new-conf');
      newConfig.credentials = undefined;

      loadEndpoint(config)
        .applyConfig(newConfig)
        .save()
        .assertExists();
    });

    it('User can delete existing endpoints', () => {
      deleteAll(ENDPOINT_LABEL_PREFIX, 'delete-endpoint-delete-button');

      cy.contains('li.MuiListItem-container', ENDPOINT_LABEL_PREFIX).should(
        'not.exist'
      );
    });
  });

  context('Logged in user - credentials', () => {
    beforeEach(() => {
      cy.openSettings('settings-menu-credentials-tab');
    });

    it('Error messages are displayed when config is bad', () => {
      addCredentials(badCredentials())
        .applyConfig()
        .assertErrorMessageVisible(
          'This field is required',
          'credential-form-label-input-error'
        )
        .assertErrorMessageVisible(
          'This field is required',
          'credential-form-user-input-error'
        )
        .assertErrorMessageVisible('Password must match.');
    });

    it('User can add new credentials.', () => {
      addCredentials(testCredentials(uid))
        .applyConfig()
        .save()
        .assertExists();
    });

    it('User cannot add duplicated credentials.', () => {
      // adding the same credentials for the second time
      addCredentials(testCredentials(uid))
        .applyConfig()
        .save()
        .assertErrorMessageVisible('This field must be unique.');
    });

    it('User can edit existing credentials', () => {
      const config = testCredentials(uid);
      const newConfig = testCredentials('new-conf');
      newConfig.user = 'zenobiusz';
      newConfig.password = 'xxxx';
      newConfig.passwordConf = 'xxxx';

      loadCredentials(config)
        .applyConfig(newConfig)
        .save()
        .assertExists();
    });

    it('User can delete existing credentials', () => {
      deleteAll(CREDENTIAL_LABEL_PREFIX, 'delete-credential-delete-button');

      cy.contains('li.MuiListItem-container', CREDENTIAL_LABEL_PREFIX).should(
        'not.exist'
      );
    });
  });
});

function deleteAll(prefix, deleteButtonId) {
  cy.get('li.MuiListItem-container').each($li => {
    const label = $li
      .find('.MuiListItem-root .MuiListItemText-root span')
      .text();
    if (label.indexOf(prefix) === 0) {
      cy.wrap($li.find(`[data-cy="${deleteButtonId}"]`)).click();
      cy.get('[data-cy="confirmation-dialog-ok"]').click();
    }
  });
}
