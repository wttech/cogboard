import { combineReducers } from 'redux';

import initialized from './initialized';
import dataFetching from './dataFetching';
import dataChanged from './dataChanged';

const app = combineReducers({
  initialized,
  dataFetching,
  dataChanged
});

export default app;