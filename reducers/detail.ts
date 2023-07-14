import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import { RootState } from '../store';
import { IActionRecipeFlag, IActionRecipeDetail} from '../types';


export const setDetailLoading = createReducer({}, {
  [types.SET_DETAIL_LOADING](state: RootState, action: IActionRecipeFlag) {
    let newState = {... state, "isLoading": action.flag };
    return newState;
  },
});

export const fetchRecipe = createReducer({}, {
  [types.SET_RECIPE](state: RootState, action: IActionRecipeDetail) {
    let newState = {... state, "recipe": action.recipe};
    return newState;
  },
});
  
  