import createReducer from '../lib/createReducer';
import * as types from '../actions/types';


export const setLoading = createReducer({}, {
    [types.SET_LOADING](state: any, action: any) {
      let newState = {... state, "isLoading": action.flag };
      return newState;
    },
});
  
export const fetchCategories = createReducer({}, {
  [types.SET_CATEGORIES](state: any, action: any) {
    let newState = {... state, "categories": action.categories };
    return newState;
  },
});

export const fetchRecipes = createReducer({}, {
  [types.SET_RECIPES](state: any, action: any) {
    let newState = {... state, "recipes": action.recipes };
    return newState;
  },
});
  