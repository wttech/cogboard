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

describe('Settings', () => {
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
});
