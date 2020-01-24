import {
  dashboardNameGen,
  columnEdgeValues,
  switchIntervalEdgeValues,
  dashboardNames,
  dashboardTypes
} from '../fixtures/Dashboard';
import { addWidgetsDashboard } from '../support/dashboard';

describe('Basic Dashboard CRUD', () => {
  const newTitle = dashboardNameGen('Edit');

  beforeEach(() => {
    cy.visit('/');
    cy.login();
  });

  it('Logged user can add new dashboard', () => {
    addWidgetsDashboard();
  });

  it('Logged user can choose dashboard', () => {
    addWidgetsDashboard().canBeSelected();
  });

  it('Anonymous user can choose dashboard', () => {
    const board = addWidgetsDashboard();
    cy.closeDrawer();
    cy.logout();
    cy.get('[data-cy="navbar-show-drawer-button"]').click();
    board.canBeSelected();
  });

  it('Logged user can edit dashboard', () => {
    addWidgetsDashboard()
      .openEditDialog()
      .setTitle(newTitle)
      .confirmChanges()
      .assertCardTitle(newTitle);
  });

  it('Logged user can remove dashboard', () => {
    addWidgetsDashboard()
      .delete()
      .assertNotVisible();
  });
});

describe('Dashboard Frontend Validation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
  });

  it(' For empty dashboard name is displayed and submit is impossible', () => {
    addWidgetsDashboard(' ', '4', '10', true).assertErrorMessageVisible(
      'This field is required'
    );
  });

  dashboardNames.forEach(value => {
    it(` For too long dashboard name is displayed and submit is impossible. Length: ${value.length}`, () => {
      const board = addWidgetsDashboard(
        value,
        dashboardTypes.widgets,
        '8',
        '10',
        true
      );
      if (value.length > 50) {
        board.assertErrorMessageVisible(
          'Title length must be less or equal to 50.'
        );
      } else {
        board.assertErrorNotVisible();
      }
    });
  });

  columnEdgeValues.forEach(value => {
    it(` For Columns input is displayed and submit is impossible for incorrect values. Edge value : ${value}`, () => {
      const board = addWidgetsDashboard(undefined, value, '10', true);
      if (value === '3') {
        board.assertErrorMessageVisible(
          'Columns number cannot be less than 4.'
        );
      } else if (value === '21') {
        board.assertErrorMessageVisible(
          'Columns number cannot be more than 20.'
        );
      } else {
        board.assertErrorNotVisible();
      }
    });
  });

  switchIntervalEdgeValues.forEach(value => {
    it(` For Switch Interval input is displayed and submit is impossible for incorrect values. Edge value: ${value}`, () => {
      const board = addWidgetsDashboard(undefined, '8', value, true);
      if (value === '2') {
        board.assertErrorMessageVisible(
          'Switch interval number cannot be less than 3.'
        );
      } else {
        board.assertErrorNotVisible();
      }
    });
  });
});

describe('Dashboard switcher', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
  });

  it('Manual switching works', () => {
    let prevDashboardName, nextDashboardName;

    addWidgetsDashboard()
      .select()
      .assertTitle();

    prevDashboardName = cy
      .get('[data-cy="previous-board-button"]')
      .invoke('attr', 'title')
      .then(title => {
        prevDashboardName = title.toString();
        cy.get('[data-cy="previous-board-button"]').click();
        cy.contains(
          '[data-cy="navbar-title-header"]',
          `${prevDashboardName}`
        ).should('is.visible');
      })
      .toString();
    cy.get('[data-cy="next-board-button"]')
      .invoke('attr', 'title')
      .then(title => {
        nextDashboardName = title.toString();
        cy.get('[data-cy="next-board-button"]').click();
        cy.contains(
          '[data-cy="navbar-title-header"]',
          `${nextDashboardName}`
        ).should('is.visible');
      });
  });

  it('Automatic switching works', () => {
    let nextDashboardName;

    addWidgetsDashboard(undefined, undefined, '3')
      .select()
      .assertTitle();

    cy.get('[data-cy="next-board-button"]')
      .invoke('attr', 'title')
      .then(title => {
        nextDashboardName = title.toString();
        cy.get('[data-cy="auto-switch-board-button"]').click();
        cy.contains(
          '[data-cy="navbar-title-header"]',
          `${nextDashboardName}`
        ).should('is.visible');
      });
  });
});
