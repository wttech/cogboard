import { MAIN_SCREEN } from '../fixtures/selectors.js';

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
      cy.isVisible(MAIN_SCREEN.LOGIN_BUTTON);
    });
    it('No logout button', () => {
      cy.notExist(MAIN_SCREEN.LOGOUT_BUTTON);
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
      cy.isVisible(MAIN_SCREEN.LOGIN_BUTTON);
    });
    it('No logout button', () => {
      cy.notExist(MAIN_SCREEN.LOGOUT_BUTTON);
    });
  });
});
