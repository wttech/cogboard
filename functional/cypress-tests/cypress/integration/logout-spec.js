import {MAIN_SCREEN, LOGIN, DASHBOARD, WIDGET} from '../fixtures/selectors.js';

describe('Logout', () => {
  context('Admin logout ', () => {
    before(() => {
      cy.clearStorage();
      cy.visit('/');
    });
    it('Login', () => {
      cy.login();
    });
    it('Logout', () => {
      cy.logout();
    });
    it('See login button', () => {
      cy.get(MAIN_SCREEN.LOGIN_BUTTON)
        .should('be.visible');
    });
    it('No logout button', () => {
      cy.get(MAIN_SCREEN.LOGOUT_BUTTON)
        .should('not.exist');
    });
  });
  context('Guest logout ', () => {
    before(() => {
      cy.clearStorage();
      cy.visit('/');
    });
    it('Login', () => {
      cy.guestLogin();
    });
    it('Logout', () => {
      cy.logout();
    });
    it('See login button', () => {
      cy.get(MAIN_SCREEN.LOGIN_BUTTON)
        .should('be.visible');
    });
    it('No logout button', () => {
      cy.get(MAIN_SCREEN.LOGOUT_BUTTON)
        .should('not.exist');
    });
  });
});