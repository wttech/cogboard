import { fillDynamicTab } from './widgetDynamicTab'

class Widget {
  constructor(name, version) {
    this.name = name;
    this.version = version;
    this.title = `Test-${name}`;
  }

  assertBackground(color) {
    cy.contains('h3', this.title)
      .parents('[draggable="true"]')
      .should(
        'have.css', 'background-color', color
      );
    return this;
  }

  click(selector) {
    cy.get(selector)
      .click();
  }

  assertColor(color) {
    cy.contains('h3', this.title)
      .parents('[draggable="true"]')
      .should(
        'have.css', 'color', color
      );
    return this;
  }

  assertText(selector, text) {
    cy.contains(selector, text)
      .should('is.visible');
    return this;
  }

  elementVisible(selector) {
    cy.get(selector)
      .should('is.visible');
    return this;
  }

  progressVisible() {
    cy.get('circle')
      .should('is.visible');
    return this;
  }

  configure(disabled) {
    cy.fillNewWidgetGeneral(this.name, this.title, false, disabled, 4, 2);
    fillDynamicTab(this);
    cy.confirmAddWidget();
    return this;
  }

  assertTitle() {
    this.assertText('h3', this.title);
    return this;
  }

  remove() {
    cy.removeWidget(this.title);
    cy.contains('h3', this.title)
      .should('not.exist');
    return this;
  }

  isDisabled() {
    cy.contains('Disabled')
      .should('is.visible');
    return this;
  }
}

export function createWidget(name) {
  return new Widget(name);
};