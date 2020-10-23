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
      .applyUser()
      .applyPassword()
      .assertErrorMessageVisible('Password must match.', 'credential-form-auth')
      .applyToken()
      .assertErrorMessageVisible(
        'This field is required',
        'credential-form-auth-label-input-error'
      )
      .assertErrorMessageVisible(
        'Label length must be less or equal to 25.',
        'credential-form-auth-user-input-error'
      );
  });

  it('User can add new credentials without username, password and token.', () => {
    addCredentials(testCredentials(uniqueUid))
      .applyMandatoryFields()
      .save()
      .assertTabDisappear()
      .assertExists();
  });

  it('User cannot add duplicated credentials.', () => {
    addCredentials(testCredentials(duplicatedUid))
      .applyMandatoryFields()
      .save()
      .assertTabDisappear();
    addCredentials(testCredentials(duplicatedUid))
      .applyMandatoryFields()
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
      .applyUser()
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
