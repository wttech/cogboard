/// <reference types="Cypress" />
import {
  testCredentials,
  testEndpoint,
  testEndpointByIp,
  badEndpoint,
  ENDPOINT_LABEL_PREFIX
} from '../fixtures/credentialsEndpoints';
import { addEndpoint, loadEndpoint } from '../support/endpoint';

describe('Endpoints', () => {
  const uid = Date.now().toString();

  before(() => {
    cy.getAuthenticationToken().then(token => {
      cy.setTestCredentials(JSON.stringify(testCredentials(uid)), token);
    });
  });

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

  it('User can edit existing endpoint and can use empty credentials', () => {
    const config = testEndpoint(uid);
    const newConfig = testEndpoint('new-conf');
    newConfig.credentials = '';

    loadEndpoint(config)
      .applyConfig(newConfig)
      .save()
      .assertExists();
  });

  it('User can delete existing endpoints', () => {
    cy.deleteAll(ENDPOINT_LABEL_PREFIX, 'delete-endpoint-delete-button');

    cy.contains('li.MuiListItem-container', ENDPOINT_LABEL_PREFIX).should(
      'not.exist'
    );
  });
});
