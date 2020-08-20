/// <reference types="Cypress" />
import {
  testCredentials,
  badCredentials,
  CREDENTIAL_LABEL_PREFIX
} from '../fixtures/credentialsEndpoints';
import { addCredentials, loadCredentials } from '../support/credential';

describe('Credentials', () => {
  const duplicatedUid = Date.now().toString();
  let uniqueUid;
  beforeEach(() => {
    uniqueUid = Date.now().toString();
    cy.openSettings('settings-menu-credentials-tab');
  });

  it('Error messages are displayed when config is bad', () => {
    addCredentials(badCredentials())
      .applyMandatoryFields()
      .assertErrorMessageVisible(
        'This field is required',
        'credential-form-auth-label-input-error'
      )
      .assertErrorMessageVisible(
        'This field is required',
        'credential-form-auth-user-input-error'
      )
      .applyPassword()
      .assertErrorMessageVisible('Password must match.', 'credential-form-auth')
      .switchToApiTokenTab()
      .applyToken()
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
    addCredentials(testCredentials(uniqueUid))
      .applyMandatoryFields()
      .applyPassword()
      .save()
      .assertTabDisappear()
      .assertExists();
  });

  it('User can add new credentials with API token only.', () => {
    addCredentials(testCredentials(uniqueUid))
      .applyMandatoryFields()
      .switchToApiTokenTab()
      .applyToken()
      .save()
      .assertTabDisappear()
      .assertExists();
  });

  it('User cannot add new credentials without password and token.', () => {
    addCredentials(testCredentials(uniqueUid))
      .applyMandatoryFields()
      .save()
      .assertErrorMessageVisible(
        'Password or token field must be set.',
        'credential-form-auth-password-input-error'
      )
      .switchToApiTokenTab()
      .save()
      .assertErrorMessageVisible(
        'Password or token field must be set.',
        'credential-form-token-token-input-error'
      );
  });

  it('User cannot add duplicated credentials.', () => {
    addCredentials(testCredentials(duplicatedUid))
      .applyMandatoryFields()
      .applyPassword()
      .save()
      .assertTabDisappear();
    addCredentials(testCredentials(duplicatedUid))
      .applyMandatoryFields()
      .applyPassword()
      .save()
      .assertErrorMessageVisible(
        'This field must be unique.',
        'credential-form-auth'
      );
  });

  it('User can edit existing credentials', () => {
    const config = testCredentials(duplicatedUid);
    const newConfig = testCredentials('new-conf');
    newConfig.user = 'zenobiusz';
    newConfig.password = 'xxxx';
    newConfig.passwordConf = 'xxxx';
    newConfig.token = 'xxxx';

    loadCredentials(config)
      .applyMandatoryFields(newConfig)
      .applyPassword(newConfig)
      .save()
      .assertTabDisappear()
      .assertExists();
  });

  it('User can delete existing credentials', () => {
    cy.deleteAll(CREDENTIAL_LABEL_PREFIX, 'delete-credential-delete-button');

    cy.contains('li.MuiListItem-container', CREDENTIAL_LABEL_PREFIX).should(
      'not.exist'
    );
  });
});
