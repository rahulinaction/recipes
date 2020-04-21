import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducer from '../reducers';


const loggerMiddleware = createLogger({predicate:(getState, action) => __DEV__ });

export default function configureStore(initialState: object) {
    const enhancer =  compose(applyMiddleware(thunkMiddleware, loggerMiddleware));     
    return createStore(reducer, initialState, enhancer);
}