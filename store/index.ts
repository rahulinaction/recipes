import { createStore, applyMiddleware, compose } from 'redux';
import { useSelector } from 'react-redux';
//import thunkMiddleware from 'redux-thunk';
//import reducer from '../reducers';
import type { TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';


//Importing reducers
import category from './slices/categorySlice';
import recipeFavorite from './slices/recipeFavoriteSlice';
import ingredient from './slices/ingredientSlice';
import recipeDetail from './slices/recipeDetailSlice'

/*const  configureStoreOld = (initialState: object) => {
  const enhancer =  compose(applyMiddleware(thunkMiddleware));
  return createStore(reducer, initialState, enhancer);
}
const store =  configureStoreOld({});
*/
export const store = configureStore({
  reducer: {
    category,
    ingredient,
    recipeFavorite,
    recipeDetail
  }  
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default  store;