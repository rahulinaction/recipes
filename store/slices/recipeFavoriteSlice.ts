import { createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Recipe } from "../../models/Recipe";
import Api from '../../lib/api';
import { delay } from '../../lib/utils'
import { getRealmConnection} from '../../schema/realm';
import { updateRecipeFavorite} from '../utils/dataUtils';

interface RecipeState{
  recipes: Recipe[],
  hasLoaded: boolean,
  error: string | undefined
}

const initialState: RecipeState = {
  recipes: [],
  hasLoaded: false,
  error:""
} 

export const fetchRecipes = createAsyncThunk("recipes/fetchFavorites",async(thunkAPI)=>{
  let realm = await getRealmConnection();
  await delay(500);
  let recipes = realm.objects<Recipe[]>('RecipeLite').sorted('date', true).toJSON();
  //@todo adding typecast
  recipes = recipes.map((recipe)=>{
    delete recipe['date'];
    return recipe;
  })
  return recipes;  
});
//dispatch from here
export const setFavoriteRecipe = createAsyncThunk("recipes/setFavorite",async(recipe: Recipe, thunkAPI)=>{
  let recipeId = await updateRecipeFavorite(recipe);
  return recipeId;
});


const recipeFavoriteSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(fetchRecipes.pending, (state, action) => {
      state.hasLoaded = false;
    })

    builder.addCase(fetchRecipes.fulfilled, (state, { payload }) => {
      state.hasLoaded = true;
      state.recipes = payload;
    })
    builder.addCase(fetchRecipes.rejected, (state, action) => {
      state.error = action.error.message?.toString();
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
export default recipeFavoriteSlice.reducer;