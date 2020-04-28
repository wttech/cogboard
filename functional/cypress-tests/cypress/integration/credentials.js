/// <reference types="Cypress" />
import {
  testCredentials,
  badCredentials,
  CREDENTIAL_LABEL_PREFIX
} from '../fixtures/credentialsEndpoints';
import { addCredentials, loadCredentials } from '../support/credential';

describe('Credentials', () => {
  const uid = Date.now().toString();

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
    cy.deleteAll(CREDENTIAL_LABEL_PREFIX, 'delete-credential-delete-button');

    cy.contains('li.MuiListItem-container', CREDENTIAL_LABEL_PREFIX).should(
      'not.exist'
    );
  });
});
