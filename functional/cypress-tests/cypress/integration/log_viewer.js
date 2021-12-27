import { logsViewer } from '../fixtures/Widgets';
import { createWidget } from '../support/widget';

const dashboardName = 'Welcome to Cogboard';

describe('Logs Viewer', () => {
  let widget;

  before(() => {
    cy.visit('/');
    cy.login();
    cy.openDrawer();
    cy.chooseDashboard(dashboardName);
    cy.clickAddWidgetButton();
    widget = createWidget(logsViewer.name).configure(false, {
      cols: 8,
      rows: 2
    });
  });

  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  describe('Searchbar', () => {
    it('Search icon is shown while there are less than 3 letters in input', () => {
      cy.get('[data-cy="search-icon"]').should('exist');
      cy.get('[data-cy="search-input-field"]').type('l');
      cy.get('[data-cy="search-icon"]').should('exist');
      cy.get('[data-cy="search-input-field"]').type('o');
      cy.get('[data-cy="search-icon"]').should('exist');
      cy.get('[data-cy="search-input-field"]').type('r');
      cy.get('[data-cy="search-icon"]').should('not.exist');
    });

    it('Close icon is shown when at least 3 letters i input', () => {
      cy.get('[data-cy="close-icon"]').should('exist');
    });

    it('All highlighted logs have text from search input', () => {
      cy.get('[data-cy="highlight-mark"]').each(mark => {
        cy.wrap(mark)
          .closest('[data-cy="log-entry"]')
          .contains(new RegExp('lor', 'gi'))
          .should('exist');
      });
    });

    it('Clearing search input works properly', () => {
      cy.get('[data-cy="close-icon"]').click();
      cy.get('[data-cy="search-input-field"]')
        .invoke('val')
        .should('be.empty');
    });
  });
});
//npx cypress run
