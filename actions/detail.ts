import * as types from './types';
import Api from '../lib/api';
import {RecipeCategory} from '../models/RecipeCategory';
import {Recipe} from '../models/Recipe';

export function setDetailLoading(flag: any) {
    return {
        type: types.SET_DETAIL_LOADING,
        flag
    }
}

export function fetchRecipe(id: number) {

    let uri = 'lookup.php?i='+id;

    return (dispatch: any, getState: any) => {
        dispatch(setDetailLoading(true));
        return Api.get(uri,{}).then(resp => {   
            let data = resp.data;
            //dispatch(setDetailLoading(false));
            dispatch(setRecipe(data["meals"]));
        }).catch( (ex: Error) => {
            console.log("The exception is",ex);
            dispatch(setDetailLoading(false));
        });
    }
}    


export function setRecipe(recipe: any) {
    return {
        type: types.SET_RECIPE,
        recipe
    }
}