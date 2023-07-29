import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducer from '../reducers';

const loggerMiddleware = createLogger({predicate:(getState, action) => __DEV__ });

const  configureStore = (initialState: object) => {
  const enhancer =  compose(applyMiddleware(thunkMiddleware));
  return createStore(reducer, initialState, enhancer);
}
const store =  configureStore({});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default  store;