import {MAIN_SCREEN, LOGIN} from '../fixtures/selectors.js';

describe('Login', () => {
  context('Login form validations', () => {
    before(() => {
      cy.openLoginForm();
    });
    it('Invalid credentials', () => {
      cy.get(LOGIN.GUEST_LOGIN_CHECKBOX)
        .uncheck();
      cy.get(LOGIN.USERNAME_INPUT)
        .clear()
        .type('invalidUsername');
      cy.get(LOGIN.PASSWORD_INPUT)
        .clear()
        .type('invalidPassword{enter}');
      cy.get(LOGIN.ERROR_MESSAGE)
        .should('be.visible');
    });
    it('Invalid password', () => {
      cy.get(LOGIN.USERNAME_INPUT)
        .clear()
        //TODO - username and password should be renamed into ADMIN_USERNAME and ADMIN_PASSWORD
        .type(Cypress.env('username'));
      cy.get(LOGIN.SUBMIT_BUTTON)
        .click();
      cy.get(LOGIN.ERROR_MESSAGE)
        .should('be.visible');
    });
    it('Fields required', () => {
      cy.get(LOGIN.USERNAME_INPUT)
        .clear();
      cy.get(LOGIN.PASSWORD_INPUT)
        .clear()
        .type('{enter}');
      cy.get(LOGIN.ERROR_MESSAGE)
        .should('be.visible');
    });
    //TODO - after fix, add field required validation for guest user
  });
  context('Admin can login', () => {
    before(() => {
      cy.openLoginForm();
    });
    after(() => {
      cy.clearStorage();
    });
    it('Fill admin login form', () => {
      cy.get(LOGIN.GUEST_LOGIN_CHECKBOX)
        .uncheck();
      cy.get(LOGIN.USERNAME_INPUT)
        .clear()
        .type(Cypress.env('username'));
      cy.get(LOGIN.PASSWORD_INPUT)
        .clear()
        .type(Cypress.env('password'))
        .type('{enter}');
    });
    it('Logged user notification is visible', () => {
      cy.contains(MAIN_SCREEN.NOTIFICATION_MESSAGE, 'Logged in as ' + Cypress.env('username'))
        .should('be.visible');
    });
    it('Login button dissapear', () => {
      cy.get(MAIN_SCREEN.LOGIN_BUTTON)
        .should('not.exist');
    });
    it('Logout button is visible', () => {
      cy.get(MAIN_SCREEN.LOGOUT_BUTTON)
        .should('is.visible');
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
      cy.get(LOGIN.GUEST_LOGIN_CHECKBOX)
        .check();
      cy.get(LOGIN.USERNAME_INPUT)
        .clear()
        .type('guestName{enter}');
    });
    it('Logged as a guest notification is visible', () => {
      cy.contains(MAIN_SCREEN.NOTIFICATION_MESSAGE, 'Logged in as Guest: guestName')
        .should('be.visible');
    });
    it('Login button dissapear', () => {
      cy.get(MAIN_SCREEN.LOGIN_BUTTON)
        .should('not.exist');
    });
    it('Logout button is visible', () => {
      cy.get(MAIN_SCREEN.LOGOUT_BUTTON)
        .should('is.visible');
    });
  });
});