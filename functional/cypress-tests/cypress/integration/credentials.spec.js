import { CREDENTIALS, DIALOG, MAIN_SCREEN, SETTINGS } from '../fixtures/selectors.js';
import { genName } from '../support/utlis';

describe('Credentials', () => {
  let label, username, password, token;
  let credentialId;
  beforeEach(() => {
    label = genName('label');
    username = genName('username');
    password = genName('password');
    token = genName('token');
    cy.visit('/');
    cy.login();
  });
  afterEach(() => {
    if (credentialId) {
      cy.removeCredentials(credentialId);
    }
    credentialId = undefined;
  });
  it('User can add credentials', () => {
    cy.clickAt(MAIN_SCREEN.SETTINGS_BUTTON);
    cy.clickAt(SETTINGS.CREDENTIALS_TAB);
    cy.clickAt(CREDENTIALS.ADD_CREDENTIAL_BUTTON);
    cy.typeText(CREDENTIALS.LABEL_INPUT, label);
    cy.typeText(CREDENTIALS.USERNAME_INPUT, username);
    cy.typeText(CREDENTIALS.PASSWORD_INPUT, password);
    cy.typeText(CREDENTIALS.PASSWORD_CONFIRMATION_INPUT, password);
    cy.typeText(CREDENTIALS.TOKEN_INPUT, token);
    cy.intercept('/api/credentials').as('getSiteInfo');
    cy.clickAt(CREDENTIALS.SUBMIT_BUTTON);
    cy.isVisible(CREDENTIALS.LIST_ITEM, label);
    cy.wait('@getSiteInfo').then(xhr => {
      credentialId = JSON.parse(xhr.response.body).id;
    });
  });
  it('User can remove credentials', () => {
    cy.addCredentials(label, username, password, token);
    cy.clickAt(MAIN_SCREEN.SETTINGS_BUTTON);
    cy.clickAt(SETTINGS.CREDENTIALS_TAB);
    cy.isVisible(CREDENTIALS.LIST_ITEM, label);
    cy.contains(CREDENTIALS.LIST_ITEM, label)
      .find(CREDENTIALS.DELETE_BUTTON)
      .click();
    cy.get(DIALOG.CONFIRM_BUTTON)
      .click();
    cy.notExist(CREDENTIALS.LIST_ITEM, label);
  });
  it('User cannot add duplicated credentials', () => {
    cy.addCredentials(label, username, password, token).then(
      id => {
        credentialId = id;
      });
    cy.reload();
    cy.clickAt(MAIN_SCREEN.SETTINGS_BUTTON);
    cy.clickAt(SETTINGS.CREDENTIALS_TAB);
    cy.isVisible(CREDENTIALS.LIST_ITEM, label);
    cy.clickAt(CREDENTIALS.ADD_CREDENTIAL_BUTTON);
    cy.typeText(CREDENTIALS.LABEL_INPUT, label);
    cy.isVisible(CREDENTIALS.LABEL_INPUT_ERROR, 'This field must be unique.');
  });
  it('User can edit existing credentials', () => {
    cy.addCredentials(label, username, password, token).then(
      id => {
        credentialId = id;
      });
    cy.reload();
    cy.clickAt(MAIN_SCREEN.SETTINGS_BUTTON);
    cy.clickAt(SETTINGS.CREDENTIALS_TAB);
    cy.isVisible(CREDENTIALS.LIST_ITEM, label);
    cy.contains(CREDENTIALS.LIST_ITEM, label)
      .find(CREDENTIALS.EDIT_BUTTON)
      .click();
    cy.typeText(CREDENTIALS.LABEL_INPUT, 'editedLabel');
    cy.intercept('/api/credentials').as('getSiteInfo');
    cy.clickAt(CREDENTIALS.SUBMIT_BUTTON);
    cy.notExist(CREDENTIALS.LIST_ITEM, label);
    cy.isVisible(CREDENTIALS.LIST_ITEM, 'editedLabel');
  });
  it('Validations', () => {
    cy.clickAt(MAIN_SCREEN.SETTINGS_BUTTON);
    cy.clickAt(SETTINGS.CREDENTIALS_TAB);
    cy.clickAt(CREDENTIALS.ADD_CREDENTIAL_BUTTON);
    cy.typeText(CREDENTIALS.LABEL_INPUT);
    cy.clickAt(CREDENTIALS.SUBMIT_BUTTON);
    cy.isVisible(CREDENTIALS.LABEL_INPUT_ERROR, 'This field is required');
    cy.typeText(CREDENTIALS.LABEL_INPUT, '12345678901234567890123456');
    cy.isVisible(CREDENTIALS.LABEL_INPUT_ERROR, 'Label length must be less or equal to 25.');
    cy.typeText(CREDENTIALS.LABEL_INPUT, '1234567890123456789012345');
    cy.notExist(CREDENTIALS.LABEL_INPUT_ERROR, 'Label length must be less or equal to 25.');
    cy.typeText(CREDENTIALS.LABEL_INPUT, '123456789012345678901234');
    cy.notExist(CREDENTIALS.LABEL_INPUT_ERROR, 'Label length must be less or equal to 25.');
    cy.typeText(CREDENTIALS.PASSWORD_INPUT, '123');
    cy.typeText(CREDENTIALS.PASSWORD_CONFIRMATION_INPUT, 'abc');
    cy.isVisible(CREDENTIALS.PASSWORD_CONFIRMATION_INPUT_ERROR, 'Password must match.');
  });
});
