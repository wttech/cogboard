import Widgets from '../fixtures/Widgets';
import { createWidget } from '../support/widget';
import { dashboardNameGen } from '../fixtures/Dashboard';

const example = Widgets.whiteSpace;

describe('Dashboard Persistence', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
  });

  it('Saved dashboard is displayed after refresh', () => {
    const name = dashboardNameGen();
    cy.addDashboard(name);
    cy.visit('/');
    cy.get('[data-cy="navbar-show-drawer-button"]').click();
    cy.contains('[data-cy="board-card"]', name)
      .scrollIntoView()
      .should('is.visible');
    cy.contains('[data-cy="board-card"]', name)
      .find('[data-cy="board-card-delete-button"]')
      .scrollIntoView()
      .click();
    cy.get('[data-cy="confirmation-dialog-ok"]').click();
  });
});

describe('Widget Persistence', () => {
  const dashboardName = 'Welcome to Cogboard';
  const title = `Test-${example.name}`;
  beforeEach(() => {
    cy.visit('/');
    cy.login();
    cy.openDrawer();
    cy.chooseDashboard(dashboardName);
    cy.clickAddWidgetButton();
  });

  it('Not saved Example widget is not displayed after refresh', () => {
    const widget = createWidget(Widgets.whiteSpace.name)
      .configure(true)
      .assertTitle();
    cy.visit('/');
    cy.openDrawer();
    cy.chooseDashboard(dashboardName);
    cy.contains('h3', widget.title).should('not.visible');
  });

  it('Saved Example widget is displayed after refresh', () => {
    const widget = createWidget(Widgets.whiteSpace.name)
      .configure(true)
      .assertTitle();
    cy.saveState();
    cy.visit('/');
    cy.openDrawer();
    cy.chooseDashboard(dashboardName);
    widget.assertTitle();
    cy.removeWidget(title);
    cy.saveState();
  });
});
