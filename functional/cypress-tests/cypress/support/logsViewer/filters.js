const logsContains = (logPartSelector, regExp) =>
  cy.get('[data-cy="log-entry"] ').each(log =>
    cy
      .wrap(log)
      .contains(logPartSelector, regExp)
      .should('exist')
  );

export const logsMatchFilter = regExp =>
  logsContains('[data-cy="log-variable-data"] p', new RegExp(regExp));

export const logsMatchLogLevel = (selectedLevel, levels) => {
  const greaterLogLevels = levels.filter(
    level => level.level >= selectedLevel.level
  );
  const regExp = new RegExp(
    greaterLogLevels.map(lvl => lvl.value).join('|'),
    'i'
  );
  logsContains('[data-cy="log-entry-level"]', regExp);
};

export const selectLogLevel = levelSlug => {
  cy.get('[data-cy="log-level-menu"]').click();
  cy.get(`[data-cy="log-level-menu-option-${levelSlug}"]`).click();
};

export const openAdvancedMenu = () =>
  cy.get('[data-cy="advanced-filters-button"]').click();

export const closeAdvancedMenu = () =>
  cy.get('[data-cy="advanced-filters-menu-exit-button"]').click();

export const isFilterVisibleInAdvancedMenu = (widget, label) => {
  widget.assertText('span.MuiListItemText-primary', label);
  widget.isChecked(
    '.MuiListItemSecondaryAction-root input[type="checkbox"]',
    true
  );
};

export const assertChip = (widget, label, chainer = 'exist') => {
  widget.assertText('[data-cy="filters-chip"] .MuiChip-label', label, chainer);
};

export const fillFormField = (field, value) => {
  cy.get(`[data-cy="filter-form-${field}-input"]`)
    .clear()
    .type(value);
};

export const submitForm = () =>
  cy.get('[data-cy="filter-form-submit-button"]').click();

export const addFilter = filter => {
  cy.get('[data-cy="add-filter-add-button"]').click();
  fillFormField('label', filter.label);
  fillFormField('reg-exp', filter.regExp);
  submitForm();
};
