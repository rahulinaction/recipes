import * as types from './types';
import Api from '../lib/api';
import {RecipeCategory} from '../models/RecipeCategory';
import {Recipe} from '../models/Recipe';
export function setLoading(flag: any) {
    return {
        type: types.SET_LOADING,
        flag
    }
}

export function fetchCategories() {

    let uri = 'categories.php';

    return (dispatch: any, getState: any) => {
        dispatch(setLoading(true));
        return Api.get(uri,{}).then(resp => {   
            let data = resp.data;
            dispatch(setFetchedCategories(data["categories"]));
        }).catch( (ex: Error) => {
            dispatch(setLoading(false));
        });
    }
}


export function fetchRecipes(category: string) {

    let uri = 'filter.php?c='+category;

    return (dispatch: any, getState: any) => {
        dispatch(setLoading(true));
        return Api.get(uri,{}).then(resp => {   
            let data = resp.data;
            //Sanitize and add flag here
            let meals = data["meals"];
            //We add this for our computation
            for(let meal of meals) {
                meal["favorite"] = false;
            }
            dispatch(setFetchedRecipes(meals));
        }).catch( (ex: Error) => {
            console.log("The exception is",ex);
            dispatch(setLoading(false));
        });
    }
}


export function fetchFavorites() {
    return {
        type: types.FETCH_FAVORITES
    }
}


export function setFetchedRecipes(recipes: Recipe[]) {
    return {
        type: types.SET_RECIPES,
        recipes
    }
}

export function setFetchedCategories(categories: RecipeCategory[]) {
    return {
        type: types.SET_CATEGORIES,
        categories
    }
}
//Listing categories
