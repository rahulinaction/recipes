import { createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Recipe } from "../../models/Recipe";
import Api from '../../lib/api';
import {delay} from '../../lib/utils'
import {getRealmConnection} from '../../schema/realm';
import {updateRecipeFavorite} from '../utils/dataUtils';
interface RecipeState{
  recipes: Recipe[],
  error: string | undefined,
  hasLoaded: boolean
}
  
const initialState:RecipeState = {
  recipes: [],
  error: "",
  hasLoaded: false
} 

export const fetchIngredients = createAsyncThunk("ingredients/fetch",async(ingredient:string ,thunkAPI)=>{
  await delay(500);
  const realm = await getRealmConnection();
  const alteredIngredient = ingredient.toLowerCase().replace(" ","_");
  const recipeIds: string[] = realm.objects<Recipe[]>('RecipeLite').toJSON().map(recipe=> recipe.idMeal) as string[];
  const uri = `filter.php?i=${alteredIngredient}`;;
  const response = await Api.get(uri,{});
  const data = response.data;
  const meals = data["meals"];
  //We add this for our computation
  const recipes = meals.map((meal:any)=>{
    meal["favorite"] = recipeIds.includes(meal["idMeal"]);
    return meal; 
  });
  return recipes;
});

export const setFavoriteRecipe = createAsyncThunk("ingredients/setFavoriteRecipe",async(recipe: Recipe, thunkAPI)=>{
  let recipeId = await updateRecipeFavorite(recipe);
  return recipeId;
});


const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(fetchIngredients.pending, (state, { payload }) => {
      state.hasLoaded = false;
    })

    builder.addCase(fetchIngredients.fulfilled, (state, { payload }) => {
      state.hasLoaded = true;
      state.recipes = payload;
    })
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.error = action.error.message?.toString();
      state.hasLoaded = false;
    })

    builder.addCase(setFavoriteRecipe.pending, (state, action) => {
      //state.isLoading = true;
    })

    builder.addCase(setFavoriteRecipe.fulfilled, (state, {payload}) => {
      const recipes = state.recipes?.map((recipe: Recipe)=>{
        if(recipe.idMeal === payload) {
          recipe.favorite = !recipe.favorite;
        }
        return recipe;
      });
      state.recipes = recipes;
    })
    builder.addCase(setFavoriteRecipe.rejected, (state, action) => {
      state.error = action.error.message?.toString();
    })
  },
});

export default ingredientSlice.reducer;

  

//Fetch ingredients

/*export const fetchIngredients = (ingredient: string) =>{
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
  }*/