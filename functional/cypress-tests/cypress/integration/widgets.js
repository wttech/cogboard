import Widgets from '../fixtures/Widgets';
import { validateWidgetConfig } from '../support/widgetAssertions';
import { createWidget } from '../support/widget';

const dashboardName = 'Welcome to Cogboard';

describe('Widgets', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
    cy.openDrawer();
    cy.chooseDashboard(dashboardName);
    cy.clickAddWidgetButton();
  });

  for (let key of Object.keys(Widgets)) {
    const config = Widgets[key];
    const name = config.name;
    const version = config.version !== undefined ? config.version : '';

    it(`${name}${version} can be configured and added by logged in user`, () => {
      let widget = createWidget(name)
        .configure(false);

      validateWidgetConfig(widget);
      widget.remove();
    });
  }

  it('Example widget can be disabled', () => {
    createWidget(Widgets.whiteSpace.name)
      .configure(true)
      .isDisabled()
      .remove();
  });
});
