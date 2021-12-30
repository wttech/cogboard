import { logsViewer } from '../fixtures/Widgets';
import { createWidget } from '../support/widget';
import {
  openAdvancedMenu,
  closeAdvancedMenu,
  addFilter,
  isFilterVisibleInAdvancedMenu,
  fillFormField,
  logsMatchFilter,
  submitForm,
  assertChip,
  logsMatchLogLevel,
  selectLogLevel
} from '../support/logsViewer/filters';
import { filters, logLevels } from '../fixtures/logsViewer';

const dashboardName = 'Welcome to Cogboard';
const ametFilter = filters.amet;
const startsWithAFilter = filters.startsWithA;

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

  describe('Filters', () => {
    it('opens advanced filters modal', () => {
      openAdvancedMenu();
      widget.assertText('h2', 'Advanced filters');
      closeAdvancedMenu();
    });

    it('should add filter', () => {
      openAdvancedMenu();
      addFilter(startsWithAFilter);

      isFilterVisibleInAdvancedMenu(widget, startsWithAFilter.label);
      closeAdvancedMenu();
    });

    it('filters correctly with 1 rule', () => {
      logsMatchFilter(startsWithAFilter.regExp);
    });

    it('should select filters via multiselect dialog', () => {
      assertChip(widget, startsWithAFilter.label);
      widget.click('[data-cy="filters-chip"] .MuiChip-deleteIcon');
      assertChip(widget, startsWithAFilter.label, 'not.exist');

      widget.click('[data-cy="filters-menu"]');
      widget.click('[data-cy="filters-menu-option"]');
      cy.get('[data-cy="filters-menu-option"]').type('{esc}');
      assertChip(widget, startsWithAFilter.label);
    });

    it('should edit filter', () => {
      openAdvancedMenu();
      widget.click('[data-cy="edit-filter-edit-button"]');
      widget.assertText('h2', 'Edit filter');
      // check if form displays data to edit
      cy.get('[data-cy="filter-form-label-input"]').should(
        'have.value',
        startsWithAFilter.label
      );
      widget.assertText(
        '[data-cy="filter-form-reg-exp-input"]',
        startsWithAFilter.regExp
      );
      fillFormField('label', ametFilter.label);
      fillFormField('reg-exp', ametFilter.regExp);
      submitForm();

      isFilterVisibleInAdvancedMenu(widget, ametFilter.label);
      closeAdvancedMenu();

      logsMatchFilter(ametFilter.regExp);
    });

    it('filters correctly with 2 rules', () => {
      openAdvancedMenu();
      addFilter(startsWithAFilter);
      closeAdvancedMenu();

      logsMatchFilter(startsWithAFilter.regExp);
      logsMatchFilter(ametFilter.regExp);
    });

    it('should delete filters', () => {
      openAdvancedMenu();

      cy.get('[data-cy="delete-filter-delete-button"]').each(filter => {
        cy.wrap(filter).click();
        cy.get('[data-cy="confirmation-dialog-ok"]').click();
      });

      for (const filter in filters) {
        widget.assertText(
          'span.MuiListItemText-primary',
          filters[filter].label,
          'not.exist'
        );
      }
      closeAdvancedMenu();
    });
  });

  describe('Log level', () => {
    logLevels.forEach(selectedLevel => {
      it(`show logs with greater or equal level to ${selectedLevel.value}`, () => {
        selectLogLevel(selectedLevel.value);
        logsMatchLogLevel(selectedLevel, logLevels);
        selectLogLevel('info'); // default
      });
    });
  });

  describe('Date span', () => {
    it('sets begin date on CLEAR LOGS button click', () => {
      widget.click('[data-cy="clear-logs-button"');

      // begin date span picker should not be empty
      cy.get('[data-cy="date-time-picker-begin"] .MuiInput-root input').should(
        'not.have.value',
        ''
      );
    });

    it('filters logs by begin date span', () =>
      cy.get('[data-cy="log-entry"]').should('not.exist'));

    it('removes date when X icon is clicked', () => {
      widget.click('[data-cy="date-time-picker-begin-clear"]');
      // should be empty
      cy.get('[data-cy="date-time-picker-begin"] .MuiInput-root input').should(
        'have.value',
        ''
      );
      cy.get('[data-cy="log-entry"]').should('exist');
    });
  });
});
