import { combineReducers } from 'redux';

import filters from './filters';
import curtains from './curtains';
import cart from './cart';

const rootReducer = combineReducers({
  filters,
  curtains,
  cart,
});

export default rootReducer;
