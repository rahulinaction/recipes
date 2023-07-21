import * as types from './types';
import Api from '../lib/api';
import { RecipeCategory } from '../models/RecipeCategory';
import {Recipe} from '../models/Recipe';
import type { PickerItem } from 'react-native-woodpicker';
import { AppDispatch, RootState} from '../store/';
import { delay } from '../lib/utils';
export const setLoading = (flag: boolean) => {
  return {
    type: types.SET_LOADING,
    flag
  }
}

export const setPickerValue = (value: PickerItem) =>{
  return {
    type: types.SET_PICKER,
    value
  }
}

export const fetchRecipes = (category: string) => {

  let uri = 'filter.php?c='+category;
  return async (dispatch: any,  getState: ()=> RootState) => {
    dispatch(setLoading(false));
    await delay(500); //Added to show a loading mechanism
    return Api.get(uri,{}).then(resp => {   
      let data = resp.data;
      //Sanitize and add flag here
      let meals = data["meals"];
      //We add this for our computation
      for(let meal of meals) {
        meal["favorite"] = false;
      }
      dispatch(setLoading(true));
      dispatch(setFetchedRecipes(meals));
    }).catch( (ex: Error) => {
      dispatch(setLoading(false));
    });
  }
}


export const  fetchCategories = () => {
  let uri = 'categories.php';
  return (dispatch: any,  getState: ()=> RootState) => {
    dispatch(setLoading(true));
    return Api.get(uri,{}).then(resp => {
      let data = resp.data;
      let categories  = data["categories"];
      let firstCategory = categories.length > 0 ? categories[0]: null;
      if(firstCategory) {
        let categoryName = firstCategory.strCategory;
        dispatch(fetchRecipes(categoryName));
        dispatch(setPickerValue({"label": categoryName, "value": categoryName}));
      }
      dispatch(setFetchedCategories(data["categories"]));
    }).catch( (ex: Error) => {
      dispatch(setLoading(false));
    });
  }
}

export const fetchFavorites = () => {
  return {
    type: types.FETCH_FAVORITES
  }
}

export const setFetchedRecipes = (recipes: Recipe[]) => {
  return {
    type: types.SET_RECIPES,
    recipes
  }
}

export const setFetchedCategories = (categories: RecipeCategory[]) => {
  return {
    type: types.SET_CATEGORIES,
    categories
  }
}

