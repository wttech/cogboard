import {MAIN_SCREEN, DASHBOARD} from '../fixtures/selectors.js';

describe('Permissions', () => {
  context('Admin permissions ', () => {
    before(() => {
      cy.clearStorage();
      cy.visit('/');
    });
    it('Login', () => {
      cy.login();
    });
    it('See widget add button', () => {
      cy.get(MAIN_SCREEN.ADD_WIDGET_BUTTON)
        .should('be.visible');
    });
    it('See widget edit button', () => {
      //TODO - before test, add board and widget
    });
    it('See dashboard add button', () => {
      cy.openDashboardsList();
      cy.get(DASHBOARD.ADD_BOARD_BUTTON)
        .should('be.visible');
    });
    it('See dashboard edit button', () => {
      cy.get(DASHBOARD.EDIT_BOARD_BUTTON)
        .should('be.visible');
    });
    it('See dashboard remove button', () => {
      cy.get(DASHBOARD.DELETE_BOARD_BUTTON)
        .should('be.visible');
    });
  });
  context('Guest permissions ', () => {
    before(() => {
      cy.clearStorage();
      cy.visit('/');
    });
    it('Login', () => {
      cy.guestLogin();
    });
    it('No widget add button', () => {
      cy.get(MAIN_SCREEN.ADD_WIDGET_BUTTON)
        .should('not.exist');
    });
    it('No widget edit button', () => {
      //TODO - before test, add board and widget
    });
    it('No dashboard add button', () => {
      cy.openDashboardsList();
      cy.get(DASHBOARD.ADD_BOARD_BUTTON)
        .should('not.exist');
    });
    it('No dashboard edit button', () => {
      cy.get(DASHBOARD.EDIT_BOARD_BUTTON)
        .should('not.exist');
    });
    it('No dashboard remove button', () => {
      cy.get(DASHBOARD.DELETE_BOARD_BUTTON)
        .should('not.exist');
    });
  });
  context('Logged out permissions ', () => {
    before(() => {
      cy.clearStorage();
      cy.visit('/');
    });
    it('No widget add button', () => {
      cy.get(MAIN_SCREEN.ADD_WIDGET_BUTTON)
        .should('not.exist');
    });
    it('No widget edit button', () => {
      //TODO - before test, add board and widget
    });
    it('No dashboard add button', () => {
      cy.openDashboardsList();
      cy.get(DASHBOARD.ADD_BOARD_BUTTON)
        .should('not.exist');
    });
    it('No dashboard edit button', () => {
      cy.get(DASHBOARD.EDIT_BOARD_BUTTON)
        .should('not.exist');
    });
    it('No dashboard remove button', () => {
      cy.get(DASHBOARD.DELETE_BOARD_BUTTON)
        .should('not.exist');
    });
  });
});