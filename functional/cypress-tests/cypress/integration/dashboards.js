import {
  dashboardNameGen,
  columnEdgeValues,
  switchIntervalEdgeValues,
  dashboardNames
} from '../fixtures/Dashboard';
import { addIframeDashboard, addWidgetsDashboard } from '../support/dashboard';

describe('Basic Dashboard CRUD', () => {
  const newTitle = dashboardNameGen('Edit');

  beforeEach(() => {
    cy.visit('/');
    cy.login();
  });

  it('Logged user can add new widgets dashboard', () => {
    addWidgetsDashboard();
  });

  it('Logged user can choose widgets dashboard', () => {
    addWidgetsDashboard().canBeSelected();
  });

  it('Logged user can add new iframe dashboard', () => {
    addIframeDashboard();
  });

  it('Logged user can choose iframe dashboard', () => {
    addIframeDashboard()
      .canBeSelected()
      .assertIframeExists();
  });

  it('Anonymous user can choose dashboard', () => {
    const board = addWidgetsDashboard();
    cy.closeDrawer();
    cy.saveState();
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

describe('Dashboard Input Validation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
  });

  it('Name input do not accept empty strings', () => {
    addWidgetsDashboard(' ')
      .expectConfigToBeInvalid()
      .assertErrorMessageVisible('This field is required');
  });

  dashboardNames.forEach(value => {
    it(`Name input accepts strings not exceeding 50 characters. Tested value: ${value.length}`, () => {
      const board = addWidgetsDashboard(value);
      if (value.length > 50) {
        board
          .expectConfigToBeInvalid()
          .assertErrorMessageVisible(
            'Title length must be less or equal to 50.'
          );
      } else {
        board.expectConfigToBeValid();
      }
    });
  });

  columnEdgeValues.forEach(value => {
    it(`Columns input accepts only values from 4 to 20. Tested value: ${value}`, () => {
      const board = addWidgetsDashboard(undefined, value);
      if (value < 4) {
        board
          .expectConfigToBeInvalid()
          .assertErrorMessageVisible('Columns number cannot be less than 4.');
      } else if (value > 20) {
        board
          .expectConfigToBeInvalid()
          .assertErrorMessageVisible('Columns number cannot be more than 20.');
      } else {
        board.expectConfigToBeValid();
      }
    });
  });

  switchIntervalEdgeValues.forEach(value => {
    it(`Switch interval input accepts only values grater than 2. Tested value: ${value}`, () => {
      const board = addWidgetsDashboard(undefined, undefined, value);
      if (value < 3) {
        board
          .expectConfigToBeInvalid()
          .assertErrorMessageVisible(
            'Switch interval number cannot be less than 3.'
          );
      } else {
        board.expectConfigToBeValid();
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
