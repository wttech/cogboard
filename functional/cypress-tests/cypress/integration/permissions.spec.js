import { MAIN_SCREEN, DASHBOARD } from '../fixtures/selectors.js';

describe('Permissions', () => {
  context('User permissions ', () => {
    before(() => {
      cy.visit('/');
    });
    after(() => {
      cy.clearStorage();
    });
    it('Login', () => {
      cy.login();
    });
    it('See settings button', () => {
      cy.isVisible(MAIN_SCREEN.SETTINGS_BUTTON);
    });
    it('See widget add button', () => {
      cy.isVisible(MAIN_SCREEN.ADD_WIDGET_BUTTON);
    });
    it('See widget edit button', () => {
      // TODO - before test, add board and widget
    });
    it('See dashboard add button', () => {
      cy.clickAt(MAIN_SCREEN.DASHBOARDS_LIST_BUTTON);
      cy.isVisible(DASHBOARD.ADD_BOARD_BUTTON);
    });
    it('See dashboard edit button', () => {
      cy.isVisible(DASHBOARD.EDIT_BOARD_BUTTON);
    });
    it('See dashboard remove button', () => {
      cy.isVisible(DASHBOARD.DELETE_BOARD_BUTTON);
    });
  });
  context('Guest permissions ', () => {
    before(() => {
      cy.visit('/');
    });
    after(() => {
      cy.clearStorage();
    });
    it('Login', () => {
      cy.guestLogin();
    });
    it('No settings button', () => {
      cy.notExist(MAIN_SCREEN.SETTINGS_BUTTON);
    });
    it('No widget add button', () => {
      cy.notExist(MAIN_SCREEN.ADD_WIDGET_BUTTON);
    });
    it('No widget edit button', () => {
      // TODO - before test, add board and widget
    });
    it('No dashboard add button', () => {
      cy.clickAt(MAIN_SCREEN.DASHBOARDS_LIST_BUTTON);
      cy.notExist(DASHBOARD.ADD_BOARD_BUTTON);
    });
    it('No dashboard edit button', () => {
      cy.notExist(DASHBOARD.EDIT_BOARD_BUTTON);
    });
    it('No dashboard remove button', () => {
      cy.notExist(DASHBOARD.DELETE_BOARD_BUTTON);
    });
  });
  context('Logged out permissions ', () => {
    before(() => {
      cy.visit('/');
    });
    after(() => {
      cy.clearStorage();
    });
    it('No settings button', () => {
      cy.notExist(MAIN_SCREEN.SETTINGS_BUTTON);
    });
    it('No widget add button', () => {
      cy.notExist(MAIN_SCREEN.ADD_WIDGET_BUTTON);
    });
    it('No widget edit button', () => {
      // TODO - before test, add board and widget
    });
    it('No dashboard add button', () => {
      cy.clickAt(MAIN_SCREEN.DASHBOARDS_LIST_BUTTON);
      cy.notExist(DASHBOARD.ADD_BOARD_BUTTON);
    });
    it('No dashboard edit button', () => {
      cy.notExist(DASHBOARD.EDIT_BOARD_BUTTON);
    });
    it('No dashboard remove button', () => {
      cy.notExist(DASHBOARD.DELETE_BOARD_BUTTON);
    });
  });
});
