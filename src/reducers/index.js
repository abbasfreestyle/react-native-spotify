import {combineReducers} from 'redux';
import nav from './navReducer';
import appData from './dataReducer';

export default combineReducers({
  appData,
  nav,
});
