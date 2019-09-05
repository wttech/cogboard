import { combineReducers } from 'redux';

import initialized from './initialized';
import dataFetching from './dataFetching';
import isDataChanged from './isDataChanged';
import isDataSaving from './isDataSaving';
import loginErrorMessage from './loginErrorMessage';
import jwToken from './jwToken';
import isAdmin from './isAdmin';

const app = combineReducers({
  initialized,
  dataFetching,
  isDataChanged,
  isDataSaving,
  loginErrorMessage,
  jwToken,
  isAdmin
});

export default app;