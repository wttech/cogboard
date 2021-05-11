export const CREDENTIALS = {
  ADD_CREDENTIAL_BUTTON: '[data-cy=add-credential-add-button]',
  CANCEL_BUTTON: '[data-cy=credential-form-cancel-button]',
  DELETE_BUTTON: '[data-cy=delete-credential-delete-button]',
  DIALOG_CONTENT: '[data-cy=app-dialog-content]',
  EDIT_BUTTON: '[data-cy=edit-credential-edit-button]',
  LABEL_INPUT: '[data-cy=credential-form-auth-label-input]',
  LABEL_INPUT_ERROR: '[data-cy=credential-form-auth-label-input-error]',
  LIST_ITEM: '[class=MuiListItem-container]',
  // TODO change selector
  PASSWORD_INPUT: '[data-cy=credential-form-auth-password-input]',
  PASSWORD_CONFIRMATION_INPUT: '[data-cy=credential-form-auth-password-confirmation-input]',
  PASSWORD_CONFIRMATION_INPUT_ERROR: '[data-cy=credential-form-auth-password-confirmation-input-error]',
  SUBMIT_BUTTON: '[data-cy=credential-form-submit-button]',
  TOKEN_INPUT: '[data-cy=credential-form-auth-token-input]',
  USERNAME_INPUT: '[data-cy=credential-form-auth-user-input]',
};

export const DASHBOARD = {
  ADD_BOARD_BUTTON: '[data-cy=add-board-add-button]',
  DELETE_BOARD_BUTTON: '[data-cy=board-card-delete-button]',
  EDIT_BOARD_BUTTON: '[data-cy=board-card-edit-button]',
};

export const LOGIN = {
  DIALOG_TITLE: '[data-cy=app-dialog-title]',
  DIALOG_CONTENT: '[data-cy=app-dialog-content]',
  ERROR_MESSAGE: '[data-cy=user-login-error-messages]',
  GUEST_LOGIN_CHECKBOX: '[data-cy=login-as-guest-select]',
  PASSWORD_INPUT: '[data-cy=user-login-password-input]',
  SUBMIT_BUTTON: '[data-cy=user-login-submit-button]',
  USERNAME_INPUT: '[data-cy=user-login-username-input]',
};

export const MAIN_SCREEN = {
  ADD_WIDGET_BUTTON: '[data-cy=main-template-add-widget-button]',
  DASHBOARDS_LIST_BUTTON: '[data-cy=navbar-show-drawer-button]',
  LOGIN_BUTTON: '[data-cy=user-login-login-icon]',
  LOGOUT_BUTTON: '[data-cy=user-login-logout-icon]',
  NOTIFICATION_MESSAGE: '[data-cy=notification-snackbar]',
  SAVE_BUTTON: '[data-cy=main-template-save-data-button]',
  SETTINGS_BUTTON: '[data-cy=settings-menu-open-button]',
};

export const SETTINGS = {
  CREDENTIALS_TAB: '[data-cy=settings-menu-credentials-tab]',
  ENDPOINTS_TAB: '[data-cy=settings-menu-endpoints-tab]',
  USER_CONTROL_TAB: '[data-cy=settings-menu-user-control-tab]',
};

export const WIDGET = {
  WIDGET_MENU: '[data-cy=more-menu-button]',
};
