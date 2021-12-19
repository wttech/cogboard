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

  describe('Filters', () => {
    const logsMatchFilter = regExp => {
      cy.get('[data-cy="log-entry"] ').each(log => {
        cy.wrap(log).contains(
          '[data-cy="log-variable-data"] p',
          new RegExp(regExp)
        );
      });
    };

    const first = { label: 'starts with a', regExp: '^a' };
    const second = { label: 'ends with a', regExp: 'a$' };

    it('Advanced filters modal shows', () => {
      widget.click('[data-cy="advanced-filters-button"]');
      widget.assertText('h2', 'Advanced filters');
    });

    it('Adding filter works', () => {
      widget.click('[data-cy="add-filter-add-button"]');

      widget.assertText('h2', 'Add new filter');
      cy.get('[data-cy="filter-form-label-input"]')
        .clear()
        .type(first.label);
      cy.get('[data-cy="filter-form-reg-exp-input"]').type(first.regExp);
      widget.click('[data-cy="filter-form-submit-button"]');

      widget.assertText('span.MuiListItemText-primary', first.label);
      widget.isChecked(
        '.MuiListItemSecondaryAction-root input[type="checkbox"]',
        true
      );

      widget.click('[data-cy="advanced-filters-menu-exit-button"]');
    });

    it('Filter removes logs correctly', () => {
      logsMatchFilter(first.regExp);
    });

    it('Filter multiselect dialog works', () => {
      widget.assertText('[data-cy="filters-chip"] .MuiChip-label', first.label);
      widget.click('[data-cy="filters-chip"] .MuiChip-deleteIcon');
      cy.contains(
        '[data-cy="filters-chip"] .MuiChip-label',
        first.label
      ).should('not.exist');

      widget.click('[data-cy="filters-menu"]');
      widget.click('[data-cy="filters-menu-option"]');
      cy.get('[data-cy="filters-menu-option"]').type('{esc}');
      widget.assertText('[data-cy="filters-chip"] .MuiChip-label', first.label);
    });
  });

  // data-cy="filters-chip"

  // doesn't work

  // after(() => {
  //   widget.remove()
  // })
});
