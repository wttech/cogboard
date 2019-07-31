import { combineReducers } from 'redux';

import initialized from './initialized';
import dataFetching from './dataFetching';

const app = combineReducers({
  initialized,
  dataFetching
});

export default app;