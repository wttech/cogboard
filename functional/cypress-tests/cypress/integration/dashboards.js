import { dashboardNameGen, columnEdgeValues, switchIntervalEdgeValues } from '../fixtures/Dashboard';
import { addIframeDashboard, addWidgetsDashboard, deleteDashboard } from '../support/dashboard';

let dashboardName;

describe('Basic Dashboard CRUD', () => {
  const newTitle = dashboardNameGen('Edit');

  beforeEach(() => {
    cy.visit('/');
    cy.login();
    dashboardName = dashboardNameGen();
  });

  afterEach(() => {
    deleteDashboard(dashboardName);
  });

  it('Logged user can add Dashboard for Widgets', () => {
    addWidgetsDashboard(dashboardName).canBeSelected();
  });

  it('Logged user can add Dashboard for iFrame', () => {
    addIframeDashboard(dashboardName)
      .canBeSelected()
      .assertIframeExists();
  });

  it('Anonymous user can choose dashboard', () => {
    const board = addWidgetsDashboard(dashboardName);
    cy.closeDrawer();
    cy.logout();
    cy.get('[data-cy="navbar-show-drawer-button"]').click();
    board.canBeSelected();
    cy.login();
  });

  it('Logged user can edit dashboard', () => {
    addWidgetsDashboard(dashboardName)
      .openEditDialog()
      .setTitle(newTitle)
      .confirmChanges()
      .assertCardTitle(newTitle);
    dashboardName = newTitle;
  });
});

describe('Dashboard Input Validation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
    dashboardName = dashboardNameGen();
  });

  it('Board title cannot be empty strings', () => {
    addWidgetsDashboard(' ')
      .expectConfigToBeInvalid()
      .assertErrorMessageVisible('This field is required');
  });

  it('Board title cannot be more than 50 chars', () => {
    dashboardName = 'Long Dashboard Name Input. It has exactly 51 chars.';
    addWidgetsDashboard(dashboardName)
      .expectConfigToBeInvalid()
      .assertErrorMessageVisible('Title length must be less or equal to 50.');
  });

  columnEdgeValues.forEach(value => {
    it(`Board Columns ${value} is ${value < 4 || value > 20 ? 'IN' : ''}VALID`, () => {
      const board = addWidgetsDashboard(dashboardName, value);
      if (value < 4) {
        board.expectConfigToBeInvalid().assertErrorMessageVisible('Columns number cannot be less than 4.');
      } else if (value > 20) {
        board.expectConfigToBeInvalid().assertErrorMessageVisible('Columns number cannot be more than 20.');
      } else {
        board.expectConfigToBeValid();
        deleteDashboard(dashboardName);
      }
    });
  });

  switchIntervalEdgeValues.forEach(value => {
    it(`Board Switch Interval ${value} is ${value < 3 ? 'IN' : ''}VALID`, () => {
      const board = addWidgetsDashboard(dashboardName, undefined, value);
      if (value < 3) {
        board.expectConfigToBeInvalid().assertErrorMessageVisible('Switch interval number cannot be less than 3.');
      } else {
        board.expectConfigToBeValid();
        deleteDashboard(dashboardName);
      }
    });
  });
});

describe('Dashboard switcher', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
    dashboardName = dashboardNameGen();
  });

  it('Manual switching works', () => {
    const prevDashboardName = 'PREV_' + dashboardName;
    const middleDashboardName = 'MIDDLE_' + dashboardName;
    const nextDashboardName = 'NEXT_' + dashboardName;

    addWidgetsDashboard(prevDashboardName).select();
    const middle = addWidgetsDashboard(middleDashboardName).select();
    addWidgetsDashboard(nextDashboardName).select();

    cy.get('[data-cy="navbar-show-drawer-button"]').click();
    middle.select();

    cy.get('[data-cy="previous-board-button"]').click();
    cy.contains('[data-cy="navbar-title-header"]', `${prevDashboardName}`).should('is.visible');

    cy.get('[data-cy="navbar-show-drawer-button"]').click();
    middle.select();

    cy.get('[data-cy="next-board-button"]').click();
    cy.contains('[data-cy="navbar-title-header"]', `${nextDashboardName}`).should('is.visible');

    deleteDashboard(prevDashboardName);
    deleteDashboard(middleDashboardName);
    deleteDashboard(nextDashboardName);
  });

  it('Automatic switching works', () => {
    const nextDashboardName = 'NEXT_' + dashboardName;

    const first = addWidgetsDashboard(dashboardName, undefined, '3').select();
    addWidgetsDashboard(nextDashboardName).select();

    cy.get('[data-cy="navbar-show-drawer-button"]').click();
    first.select();

    cy.get('[data-cy="auto-switch-board-button"]').click();
    cy.contains('[data-cy="navbar-title-header"]', `${nextDashboardName}`).should('is.visible');

    deleteDashboard(dashboardName);
    deleteDashboard(nextDashboardName);
  });
});
