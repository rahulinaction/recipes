import { combineReducers } from 'redux';
import * as listReducer from './list';
import * as detailReducer from './detail';
export default combineReducers((<any>Object).assign(listReducer, detailReducer));