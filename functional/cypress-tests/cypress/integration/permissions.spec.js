import { MAIN_SCREEN, DASHBOARD } from '../fixtures/selectors.js';

describe('Permissions', () => {
  beforeEach(() => {
    cy.clearStorage();
    cy.visit('/');
  });
  it('User permissions', () => {
    cy.login();
    cy.isVisible(MAIN_SCREEN.SETTINGS_BUTTON);
    cy.isVisible(MAIN_SCREEN.ADD_WIDGET_BUTTON);
    // TODO - See widget edit button - before test, add board and widget
    cy.clickAt(MAIN_SCREEN.DASHBOARDS_LIST_BUTTON);
    cy.isVisible(DASHBOARD.ADD_BOARD_BUTTON);
    cy.isVisible(DASHBOARD.EDIT_BOARD_BUTTON);
    cy.isVisible(DASHBOARD.DELETE_BOARD_BUTTON);
  });
  it('Guest permissions', () => {
    cy.guestLogin();
    cy.notExist(MAIN_SCREEN.SETTINGS_BUTTON);
    cy.notExist(MAIN_SCREEN.ADD_WIDGET_BUTTON);
    // TODO - No widget edit button - before test, add board and widget
    cy.clickAt(MAIN_SCREEN.DASHBOARDS_LIST_BUTTON);
    cy.notExist(DASHBOARD.ADD_BOARD_BUTTON);
    cy.notExist(DASHBOARD.EDIT_BOARD_BUTTON);
    cy.notExist(DASHBOARD.DELETE_BOARD_BUTTON);
  });
  it('Logged out permissions', () => {
    cy.notExist(MAIN_SCREEN.SETTINGS_BUTTON);
    cy.notExist(MAIN_SCREEN.ADD_WIDGET_BUTTON);
    // TODO - No widget edit button - before test, add board and widget
    cy.clickAt(MAIN_SCREEN.DASHBOARDS_LIST_BUTTON);
    cy.notExist(DASHBOARD.ADD_BOARD_BUTTON);
    cy.notExist(DASHBOARD.EDIT_BOARD_BUTTON);
    cy.notExist(DASHBOARD.DELETE_BOARD_BUTTON);
  });
});
