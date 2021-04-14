import { CREDENTIALS, MAIN_SCREEN, SETTINGS } from '../fixtures/selectors.js';

describe('Credentials', () => {
  /*
  context('Credentials form validations', () => {
    before(() => {
      cy.visit('/');
      cy.login();
      cy.clickAt(MAIN_SCREEN.SETTINGS_BUTTON);
      cy.clickAt(SETTINGS.CREDENTIALS_TAB);
      cy.clickAt(CREDENTIALS.ADD_CREDENTIAL_BUTTON);
    });
    after(() => {
      cy.clearStorage();
    });
    it('Field required', () => {
      cy.typeText(CREDENTIALS.LABEL_INPUT);
      cy.clickAt(CREDENTIALS.SUBMIT_BUTTON);
      cy.isVisible(CREDENTIALS.LABEL_INPUT_ERROR, 'This field is required');
    });
    it('Label length > 25 error', () => {
      cy.typeText(CREDENTIALS.LABEL_INPUT, '12345678901234567890123456');
      cy.isVisible(CREDENTIALS.LABEL_INPUT_ERROR, 'Label length must be less or equal to 25.');
    });
    it('Label length <= 25 ok', () => {
      cy.typeText(CREDENTIALS.LABEL_INPUT, '1234567890123456789012345');
      cy.notExist(CREDENTIALS.LABEL_INPUT_ERROR, 'Label length must be less or equal to 25.');
      cy.typeText(CREDENTIALS.LABEL_INPUT, '123456789012345678901234');
      cy.notExist(CREDENTIALS.LABEL_INPUT_ERROR, 'Label length must be less or equal to 25.');
    });
    it('Password must match', () => {
      cy.typeText(CREDENTIALS.PASSWORD_INPUT, '123');
      cy.typeText(CREDENTIALS.PASSWORD_CONFIRMATION_INPUT, 'abc');
      cy.isVisible(CREDENTIALS.PASSWORD_CONFIRMATION_INPUT_ERROR, 'Password must match.');
    });
  }); */
  context('User can add credentials', () => {
    let id;
    let credentialID;

    before(() => {
      id = Date.now().toString();
      cy.visit('/');
      cy.login();
      cy.clickAt(MAIN_SCREEN.SETTINGS_BUTTON);
      cy.clickAt(SETTINGS.CREDENTIALS_TAB);
      cy.clickAt(CREDENTIALS.ADD_CREDENTIAL_BUTTON);
    });
    it('Add new credentials', () => {
      cy.typeText(CREDENTIALS.LABEL_INPUT, id);
      cy.typeText(CREDENTIALS.USERNAME_INPUT, 'username');
      cy.typeText(CREDENTIALS.PASSWORD_INPUT, 'password');
      cy.typeText(CREDENTIALS.PASSWORD_CONFIRMATION_INPUT, 'password');
      cy.typeText(CREDENTIALS.TOKEN_INPUT, 'token');

      cy.intercept('/api/credentials').as('getSiteInfo');
      cy.clickAt(CREDENTIALS.SUBMIT_BUTTON);
      cy.wait('@getSiteInfo').then(xhr => {
        credentialID = JSON.parse(xhr.response.body).id;
        cy.log(credentialID);
        cy.isVisible(CREDENTIALS.LIST_ITEM, id);
        cy.removeCredentials(credentialID);
      });
    });
    it('Assert that credentials were added', () => {
      // cy.isVisible(CREDENTIALS.LIST_ITEM, id);
      // cy.removeCredentials(id);
    });
  });
});
/*

it('Remove credentials', () => {
  cy.contains('[class=MuiListItem-container]', id).find('[data-cy=delete-credential-delete-button]').click();
  cy.contains('span', 'delete').should('be.visible');
});
});
});


Label length must be less or equal to 25.

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
*/
