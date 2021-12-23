import { createWidget } from '../support/widget';
import { logViewer } from '../fixtures/Widgets';

const dashboardName = 'Welcome to Cogboard';

describe('Logs Viewer', () => {
  let widget;
  before(() => {
    cy.visit('/');
    cy.login();
    cy.openDrawer();
    cy.chooseDashboard(dashboardName);
    cy.clickAddWidgetButton();
    widget = createWidget(logViewer.name).configure(false);
  });

  it('Quarantine button visible while logged in', () => {
    cy.get('[data-cy="advanced-filters-button"]').click();
    cy.get('[data-cy="quarantine-show-dialog-button"]').should('exist');
    cy.get('[data-cy="advanced-filters-menu-exit-button"]').click();
  });

  it('Quarantine button invisible while logged out', () => {
    cy.get('[data-cy="user-login-logout-icon"]').click();
    cy.get('[data-cy="advanced-filters-button"]').click();
    cy.get('[data-cy="quarantine-show-dialog-button"]').should('not.exist');
    cy.get('[data-cy="advanced-filters-menu-exit-button"]').click();
    cy.login();
    widget.remove();
  });
});
