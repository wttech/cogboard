export const logsMatchFilter = regExp => cy.get('[data-cy="log-entry"] ')
  .each(log => 
    cy.wrap(log).contains(
      '[data-cy="log-variable-data"] p',
      new RegExp(regExp)
    )
  );

export const openAdvancedMenu = () =>
  cy.get('[data-cy="advanced-filters-button"]').click()

export const closeAdvancedMenu = () =>
  cy.get('[data-cy="advanced-filters-menu-exit-button"]').click()

export const isFilterVisibleInAdvancedMenu = (widget, label) => {
  widget.assertText('span.MuiListItemText-primary', label);
  widget.isChecked(
    '.MuiListItemSecondaryAction-root input[type="checkbox"]',
    true
  );
};

export const assertChip = (widget, label, chainer) => {
  widget.assertText(
    '[data-cy="filters-chip"] .MuiChip-label',
    label, chainer
  );
}

export const fillFormField = (field, value) => {
  cy.get(`[data-cy="filter-form-${field}-input"]`)
    .clear()
    .type(value);
};

export const submitForm = () =>
  cy.get('[data-cy="filter-form-submit-button"]').click();

export const addFilter = (filter) => {
  cy.get('[data-cy="add-filter-add-button"]').click();
  fillFormField('label', filter.label);
  fillFormField('reg-exp', filter.regExp);
  submitForm();
}