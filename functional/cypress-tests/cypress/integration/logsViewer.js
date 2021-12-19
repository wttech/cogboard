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
    const label = 'starts with a';
    const regExp = '^a';

    it('Advanced filters modal shows', () => {
      widget.click('[data-cy="advanced-filters-button"]');
      widget.assertText('h2', 'Advanced filters');
    });

    it('Adding filter works', () => {
      widget.click('[data-cy="add-filter-add-button"]');

      widget.assertText('h2', 'Add new filter');
      cy.get('[data-cy="filter-form-label-input"]')
        .clear()
        .type(label);
      cy.get('[data-cy="filter-form-reg-exp-input"]').type(regExp);
      widget.click('[data-cy="filter-form-submit-button"]');

      widget.assertText('span.MuiListItemText-primary', label);
      widget.isChecked(
        '.MuiListItemSecondaryAction-root input[type="checkbox"]',
        true
      );

      widget.click('[data-cy="advanced-filters-menu-exit-button"]');
    });

    it('Filter shows in multiselect', () => {
      widget.assertText('.MuiChip-label', label);
    });

    it('Filter filters logs', () => {
      cy.get('[data-cy="log-entry"] ').each(log => {
        cy.wrap(log).contains(
          '[data-cy="log-variable-data"] p',
          new RegExp(regExp)
        );
      });
    });
  });

  // doesn't work

  // after(() => {
  //   widget.remove()
  // })
});
