import { combineReducers } from 'redux';

import initialized from './initialized';
import dataFetching from './dataFetching';
import isDataChanged from './isDataChanged';
import isDataSaving from './isDataSaving';
import loginErrorMessage from './loginErrorMessage';
import isAuthenticated from './isAuthenticated';
import logoutReasonMessage from './logoutReasonMessage';

const app = combineReducers({
  initialized,
  dataFetching,
  isDataChanged,
  isDataSaving,
  loginErrorMessage,
  isAuthenticated,
  logoutReasonMessage
});

export default app;
