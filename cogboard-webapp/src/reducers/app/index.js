import { combineReducers } from 'redux';

import initialized from './initialized';
import dataFetching from './dataFetching';
import isDataChanged from './isDataChanged';
import isDataSaving from './isDataSaving';

const app = combineReducers({
  initialized,
  dataFetching,
  isDataChanged,
  isDataSaving
});

export default app;