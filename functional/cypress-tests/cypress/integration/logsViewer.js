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
} from '../support/logsViewer/filters';
import { filters } from '../fixtures/logsViewer';

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
      rows: 2,
    });
  });

  describe('Filters', () => {
    it('Advanced filters modal', () => {
      openAdvancedMenu();
      widget.assertText('h2', 'Advanced filters');
      closeAdvancedMenu();
    });

    it('Adding filter', () => {
      openAdvancedMenu();
      addFilter(filters[0]);

      isFilterVisibleInAdvancedMenu(widget, filters[0].label);
      closeAdvancedMenu();
    });

    it('Filters correctly with 1 rule', () => {
      logsMatchFilter(filters[0].regExp);
    });

    it('Multiselect dialog works', () => {
      assertChip(widget, filters[0].label);
      widget.click('[data-cy="filters-chip"] .MuiChip-deleteIcon');
      assertChip(widget, filters[0].label, 'not.exist');

      widget.click('[data-cy="filters-menu"]');
      widget.click('[data-cy="filters-menu-option"]');
      cy.get('[data-cy="filters-menu-option"]').type('{esc}');
      assertChip(widget, filters[0].label);
    });

    it('Editing filter', () => {
      openAdvancedMenu();
      widget.click('[data-cy="edit-filter-edit-button"]');
      widget.assertText('h2', 'Edit filter');
      cy.get('[data-cy="filter-form-label-input"]').should(
        'have.attr',
        'value',
        filters[0].label
      );
      widget.assertText(
        '[data-cy="filter-form-reg-exp-input"]',
        filters[0].regExp
      );
      fillFormField('label', filters[1].label);
      fillFormField('reg-exp', filters[1].regExp);
      submitForm();

      isFilterVisibleInAdvancedMenu(widget, filters[1].label);
      closeAdvancedMenu();

      logsMatchFilter(filters[1].regExp);
      assertChip(widget, filters[1].label);
    });

    it('Filters correctly with 2 rules', () => {
      openAdvancedMenu();
      addFilter(filters[0]);
      closeAdvancedMenu();

      logsMatchFilter(filters[0].regExp);
      logsMatchFilter(filters[1].regExp);
    });

    it('Deleting filters', () => {
      openAdvancedMenu();

      cy.get('[data-cy="delete-filter-delete-button"]').each((filter) => {
        cy.wrap(filter).click();
        cy.get('[data-cy="confirmation-dialog-ok"]').click();
      });

      filters.forEach((filter) =>
        widget.assertText(
          'span.MuiListItemText-primary',
          filter.label,
          'not.exist'
        )
      );
      closeAdvancedMenu();
    });
  });

  // doesn't work

  // after(() => {
  //   widget.remove()
  // })
});
