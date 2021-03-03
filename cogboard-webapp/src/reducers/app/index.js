import { combineReducers } from 'redux';

import initialized from './initialized';
import dataFetching from './dataFetching';
import isDataChanged from './isDataChanged';
import isDataSaving from './isDataSaving';
import loginErrorMessage from './loginErrorMessage';
import isAuthenticated from './isAuthenticated';
import guestLogin from './guestLogin';
import logoutReasonMessage from './logoutReasonMessage';
import settings from './settings';

const app = combineReducers({
  initialized,
  dataFetching,
  isDataChanged,
  isDataSaving,
  loginErrorMessage,
  isAuthenticated,
  guestLogin,
  logoutReasonMessage,
  settings
});

export default app;
