import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import {Recipe} from '../models/Recipe';

export const setLoading = createReducer({}, {
    [types.SET_LOADING](state: any, action: any) {
      let newState = {... state, "isLoading": action.flag };
      return newState;
    },
});
  
export const setPickerValue = createReducer({}, {
  [types.SET_PICKER](state: any, action: any) {
    let newState = {... state, "pickerValue": action.value };
    return newState;
  },
});

export const fetchCategories = createReducer({}, {
  [types.SET_CATEGORIES](state: any, action: any) {
    let filteredCategories = [];
    if(typeof action.categories!=="undefined") {
      for(let i=0;i<action.categories.length;i++) {
        let category = action.categories[i];
        filteredCategories.push({"label":category.strCategory, "value": category.strCategory});
      } 
    }
    let newState = {... state, "categories": action.categories, "filteredCategories": filteredCategories };
    return newState;
  },
});

//State for all the list of recipes
export const fetchRecipes = createReducer({}, {
  [types.SET_RECIPES](state: any, action: any) {
    let newState = {... state, "recipes": action.recipes };
    return newState;
  },
  [types.SET_FAVORITE](state: any, action: any) {
    let recipes = state.recipes?.map((recipe: Recipe)=>{
      if(recipe.idMeal === action.id) {
        recipe.favorite = !recipe.favorite;
      }
      return recipe;
    })
    let newState = {... state, "recipes": recipes };
    return newState;
  },
  [types.FETCH_FAVORITES](state: any, action: any) {
    let recipes =  state.recipes?.filter((recipe: Recipe)=>{
      return recipe.favorite == true;
    });
    
    let newState = {... state, "favorites": recipes };
    return newState;
  }
});
  