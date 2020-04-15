import createReducer from '../lib/createReducer';
import * as types from '../actions/types';


export const setDetailLoading = createReducer({}, {
    [types.SET_DETAIL_LOADING](state: any, action: any) {
      let newState = {... state, "isLoading": action.flag };
      return newState;
    },
});

export const fetchRecipe = createReducer({}, {
    [types.SET_RECIPE](state: any, action: any) {
      let newState = {... state, "recipe": action.recipe};
      return newState;
    },
});
  
  