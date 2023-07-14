import * as types from './types';
import Api from '../lib/api';
import { RecipeCategory } from '../models/RecipeCategory';
import { Recipe } from '../models/Recipe';
import { AppDispatch, RootState } from '../store/';
import { DetailDispatch, DispatchLoadingFlag, DispatchRecipes, DispatchRecipe } from '../types';
export const setDetailLoading = (flag: boolean) => {
  return {
    type: types.SET_DETAIL_LOADING,
    flag
  }
}

export const fetchRecipe = (id: number) => {

  let uri = 'lookup.php?i='+id;
  return (dispatch: DetailDispatch  , getState: ()=> RootState) => {
    dispatch(setDetailLoading(true));
    return Api.get(uri,{}).then(resp => {   
      let data = resp.data;
      //dispatch(setDetailLoading(false));
      dispatch(setRecipe(data["meals"]));
    }).catch( (ex: Error) => {
    dispatch(setDetailLoading(false));
    });
  }
}    

export const setRecipe = (recipe: Recipe) => {
  return {
    type: types.SET_RECIPE,
    recipe
  }
}

export const setFavorite = (recipe: Recipe) => {
  return {
    type: types.SET_FAVORITE,
    recipe
  }
}