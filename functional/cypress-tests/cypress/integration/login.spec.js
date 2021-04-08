import { MAIN_SCREEN, LOGIN } from '../fixtures/selectors.js';

describe('Login', () => {
  context('Login form validations', () => {
    before(() => {
      cy.openLoginForm();
    });
    it('Invalid credentials', () => {
      cy.checkbox(LOGIN.GUEST_LOGIN_CHECKBOX, 'uncheck');
      cy.typeText(LOGIN.USERNAME_INPUT, 'invalidUsername');
      cy.typeText(LOGIN.PASSWORD_INPUT, 'invalidPassword{enter}');
      cy.isVisible(LOGIN.ERROR_MESSAGE);
    });
    it('Invalid password', () => {
      cy.typeText(LOGIN.USERNAME_INPUT, Cypress.env('username'));
      cy.clickAt(LOGIN.SUBMIT_BUTTON);
      cy.isVisible(LOGIN.ERROR_MESSAGE);
    });
    it('Fields required', () => {
      cy.typeText(LOGIN.USERNAME_INPUT);
      cy.typeText(LOGIN.PASSWORD_INPUT, '{enter');
      cy.isVisible(LOGIN.ERROR_MESSAGE);
    });
    // TODO - after fix, add field required validation for guest user
  });
  context('Admin can login', () => {
    before(() => {
      cy.openLoginForm();
    });
    after(() => {
      cy.clearStorage();
    });
    it('Fill admin login form', () => {
      cy.checkbox(LOGIN.GUEST_LOGIN_CHECKBOX, 'uncheck');
      cy.typeText(LOGIN.USERNAME_INPUT, Cypress.env('username'));
      cy.typeText(LOGIN.PASSWORD_INPUT, `${Cypress.env('password')}{enter}`);
    });
    it('Logged user notification is visible', () => {
      cy.isVisible(MAIN_SCREEN.NOTIFICATION_MESSAGE, `Logged in as ${Cypress.env('username')}`);
    });
    it('Login button dissapear', () => {
      cy.notExist(MAIN_SCREEN.LOGIN_BUTTON);
    });
    it('Logout button is visible', () => {
      cy.isVisible(MAIN_SCREEN.LOGOUT_BUTTON);
    });
  });
  context('Guest can login', () => {
    before(() => {
      cy.openLoginForm();
    });
    after(() => {
      cy.clearStorage();
    });
    it('Fill guest login form', () => {
      cy.checkbox(LOGIN.GUEST_LOGIN_CHECKBOX, 'check');
      cy.typeText(LOGIN.USERNAME_INPUT, 'guestName{enter}');
    });
    it('Logged as a guest notification is visible', () => {
      cy.isVisible(MAIN_SCREEN.NOTIFICATION_MESSAGE, 'Logged in as Guest: guestName');
    });
    it('Login button dissapear', () => {
      cy.notExist(MAIN_SCREEN.LOGIN_BUTTON);
    });
    it('Logout button is visible', () => {
      cy.isVisible(MAIN_SCREEN.LOGOUT_BUTTON);
    });
  });
});
