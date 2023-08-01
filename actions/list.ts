import * as types from './types';
import Api from '../lib/api';
import { RecipeCategory } from '../models/RecipeCategory';
import { Recipe } from '../models/Recipe';
import type { PickerItem } from 'react-native-woodpicker';
import { AppDispatch, RootState} from '../store/';
import { delay } from '../lib/utils';
import Realm from 'realm';
import { realmConfig }  from '../schema/realm';

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
    const realm = await  Realm.open(realmConfig);
    const recipeIds: string[] = realm.objects<Recipe[]>('RecipeLite').toJSON().map(recipe=> recipe.idMeal) as string[];
    dispatch(setLoading(false));
    await delay(500); //Added to show a loading mechanism
    return Api.get(uri,{}).then(resp => {   
      const data = resp.data;
      //Sanitize and add flag here
      const meals = data["meals"];
      //We add this for our computation
      for(let meal of meals) {
        meal["favorite"] = recipeIds.includes(meal["idMeal"]) ;
      }
      dispatch(setLoading(true));
      dispatch(setFetchedRecipes(meals));
    }).catch( (ex: Error) => {
      dispatch(setLoading(false));
    });
  }
}

export const setFavorite = (recipe: Recipe) => {
  return async (dispatch: any,  getState: ()=> RootState) => {
    Realm.open(realmConfig).then((realm)=>{
      const favorite = recipe.favorite;
      const recipeObject = {
        strMeal: recipe.strMeal,
        strMealThumb: recipe.strMealThumb,
        idMeal: recipe.idMeal,
        favorite: !favorite,
        date: new Date(),
      };

      //Update recipe state
      
      realm.write(() => {
        if(favorite){
          let fetchedRecipe = realm.objects("RecipeLite").filtered('idMeal= $0', recipe.idMeal);
          realm.delete(fetchedRecipe);
          //Dispatch recipes
        }else {
          let createdRecipe = realm.create("RecipeLite", recipeObject);
          //Dispatch recipes
        }
        dispatch(updateFavorite(recipeObject.idMeal));
      });

    }).catch((error)=>{
      console.log("Error is:",error);
    });
  }

}
//Refactor realm connections
export const fetchFavorites = () => {
  return async (dispatch: any,  getState: ()=> RootState) => {
    dispatch(setLoading(false));
    Realm.open(realmConfig).then( async (realm)=>{
      await delay(500);
      let recipes = realm.objects<Recipe[]>('RecipeLite').sorted('date', true).toJSON();
      dispatch(setLoading(true));
      dispatch(setFavorites(recipes as Recipe[]));
    }).catch((error)=>{
      dispatch(setLoading(false));
    })
  }  
}



export const  fetchCategories = () => {
  let uri = 'categories.php';
  return (dispatch: any,  getState: ()=> RootState) => {
    dispatch(setLoading(true));
    return Api.get(uri,{}).then(resp => {
      const data = resp.data;
      const categories  = data["categories"];
      const firstCategory = categories.length > 0 ? categories[0]: null;
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

//Fetch ingredients

export const fetchIngredients = (ingredient: string) =>{
  let alteredIngredient = ingredient.toLowerCase().replace(" ","_");
  let uri = `filter.php?i=${alteredIngredient}`;


  return async (dispatch: any,  getState: ()=> RootState) => {
    const realm = await  Realm.open(realmConfig);
    const recipeIds: string[] = realm.objects<Recipe[]>('RecipeLite').toJSON().map(recipe=> recipe.idMeal) as string[];
    dispatch(setLoading(true));
    return Api.get(uri,{}).then(resp => {
      const data = resp.data;
      const  meals  = data["meals"];
      for(let meal of meals) {
        meal["favorite"] = recipeIds.includes(meal["idMeal"]) ;
      }
      dispatch(setIngredientRecipes(meals));      
    }).catch( (ex: Error) => {
      console.log('Fetched ingredient',ex);
      dispatch(setLoading(false));
    });
  }
}


export const setFetchedRecipes = (recipes: Recipe[]) => {
  return {
    type: types.SET_RECIPES,
    recipes
  }
}

export const updateFavorite = (id: number) => {
  return {
    type: types.UPDATE_FAVORITE,
    id
  }
}

export const setFetchedCategories = (categories: RecipeCategory[]) => {
  return {
    type: types.SET_CATEGORIES,
    categories
  }
}



export const setFavorites = (recipes: Recipe[]) => {
  return {
    type: types.SET_FAVORITES,
    recipes
  }
}

export const setIngredientRecipes = (recipes: Recipe[]) => {
  return {
    type: types.SET_INGREDIENT_RECIPES,
    recipes
  }
}

