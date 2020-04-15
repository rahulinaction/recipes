import { combineReducers } from 'redux';
import * as listReducer from './list';

export default combineReducers((<any>Object).assign(listReducer));