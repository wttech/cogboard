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

    const openAdvancedMenu = () =>
      widget.click('[data-cy="advanced-filters-button"]');
    const closeAdvancedMenu = () =>
      widget.click('[data-cy="advanced-filters-menu-exit-button"]');
    const isFilterVisibleInAdvancedMenu = label => {
      widget.assertText('span.MuiListItemText-primary', label);
      widget.isChecked(
        '.MuiListItemSecondaryAction-root input[type="checkbox"]',
        true
      );
    };
    const fillFormField = (field, value) => {
      cy.get(`[data-cy="filter-form-${field}-input"]`)
        .clear()
        .type(value);
    };
    const submitForm = () =>
      widget.click('[data-cy="filter-form-submit-button"]');

    const filters = [
      {
        label: 'starts with a',
        regExp: '^a'
      },
      {
        label: 'ends with a',
        regExp: 'a$'
      }
    ];

    it('Advanced filters modal shows', () => {
      openAdvancedMenu();
      widget.assertText('h2', 'Advanced filters');
    });

    it('Adding filter works', () => {
      widget.click('[data-cy="add-filter-add-button"]');

      widget.assertText('h2', 'Add new filter');
      fillFormField('label', filters[0].label);
      fillFormField('reg-exp', filters[0].regExp);
      submitForm();

      isFilterVisibleInAdvancedMenu(filters[0].label);
      closeAdvancedMenu();
    });

    it('Filter filters logs correctly', () => {
      logsMatchFilter(filters[0].regExp);
    });

    it('Multiselect dialog works', () => {
      widget.assertText(
        '[data-cy="filters-chip"] .MuiChip-label',
        filters[0].label
      );
      widget.click('[data-cy="filters-chip"] .MuiChip-deleteIcon');
      cy.contains(
        '[data-cy="filters-chip"] .MuiChip-label',
        filters[0].label
      ).should('not.exist');

      widget.click('[data-cy="filters-menu"]');
      widget.click('[data-cy="filters-menu-option"]');
      cy.get('[data-cy="filters-menu-option"]').type('{esc}');
      widget.assertText(
        '[data-cy="filters-chip"] .MuiChip-label',
        filters[0].label
      );
    });

    it('Editing filter works', () => {
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

      isFilterVisibleInAdvancedMenu(filters[1].label);
      closeAdvancedMenu();

      logsMatchFilter(filters[1].regExp);
      widget.assertText(
        '[data-cy="filters-chip"] .MuiChip-label',
        filters[1].label
      );
    });
  });

  // doesn't work

  // after(() => {
  //   widget.remove()
  // })
});
