import { combineReducers } from 'redux';
import partyReducer from './partyReducer';
import tableReducer from './tableReducer';

export default combineReducers({ parties: partyReducer, tables: tableReducer})