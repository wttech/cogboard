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
      .applyBasicAuth()
      .assertErrorMessageVisible(
        'This field is required',
        'credential-form-auth-label-input-error'
      )
      .assertErrorMessageVisible(
        'This field is required',
        'credential-form-auth-user-input-error'
      )
      .assertErrorMessageVisible('Password must match.', 'credential-form-auth')
      .applyTokenApi()
      .assertErrorMessageVisible(
        'This field is required',
        'credential-form-token-label-input-error'
      )
      .assertErrorMessageVisible(
        'This field is required',
        'credential-form-token-user-input-error'
      );
  });

  it('User can add new credentials with basic auth only.', () => {
    addCredentials(testCredentials(uid))
      .applyBasicAuth()
      .save()
      .assertExists();
  });

  it('User can add new credentials with API token only.', () => {
    addCredentials(testCredentials(uid))
      .applyTokenApi()
      .save()
      .assertExists();
  });

  it('User cannot add duplicated credentials.', () => {
    // adding the same credentials for the second time
    addCredentials(testCredentials(uid))
      .applyBasicAuth()
      .save()
      .assertErrorMessageVisible(
        'This field must be unique.',
        'credential-form-auth'
      );
  });

  it('User can edit existing credentials', () => {
    const config = testCredentials(uid);
    const newConfig = testCredentials('new-conf');
    newConfig.user = 'zenobiusz';
    newConfig.password = 'xxxx';
    newConfig.passwordConf = 'xxxx';
    newConfig.token = 'xxxx';

    loadCredentials(config)
      .applyBasicAuth(newConfig)
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
