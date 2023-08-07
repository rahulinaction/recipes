import { createAsyncThunk ,createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RecipeCategory } from '../../models/RecipeCategory';
import { Recipe } from '../../models/Recipe';
import Api from '../../lib/api'
import {getRecipesByCategory, updateRecipeFavorite} from '../utils/dataUtils';
import {getRealmConnection} from '../../schema/realm';

interface PickerValue {
  label: string,
  value: string
}

interface RecipeCategoryState{
  categories: RecipeCategory[],
  recipes: Recipe[],
  isLoading: boolean,
  error: string | undefined,
  pickerValue: PickerValue
}
  
const initialState:RecipeCategoryState = {
  categories: [],
  error: '',
  isLoading: false,
  recipes: [],
  pickerValue: {label:"", value:""}
} 

export const fetchCategories = createAsyncThunk("categories/fetch",async(thunkAPI)=>{
  const uri = "categories.php";
  const response = await Api.get(uri,{});
  const data = response.data;
  const categories  = data["categories"];
  const firstCategory = categories.length > 0 ? categories[0]: null;
  let categoryName = firstCategory.strCategory;
  const recipes = await getRecipesByCategory(categoryName);
  return {categories, categoryValue:{label: categoryName, value: categoryName }, recipes };
});

export const updateCategory = createAsyncThunk("category/update",async(category: PickerValue, thunkAPI)=>{
  let categoryName = category.value;
  const recipes = await getRecipesByCategory(categoryName);
  return {categoryValue: category, recipes };
});


export const setFavoriteRecipe = createAsyncThunk("category/setFavoriteRecipe",async(recipe: Recipe, thunkAPI)=>{
  let recipeId = await updateRecipeFavorite(recipe);
  return recipeId;
});


const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(fetchCategories.pending, (state, { payload }) => {
      state.isLoading = false;
    })  

    builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
      state.categories = payload.categories;
      state.pickerValue = payload.categoryValue;
      state.isLoading = true;
      state.recipes = payload.recipes as Recipe[];
    })
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.error = action.error.message?.toString();
      state.isLoading = false;
    })

    builder.addCase(updateCategory.pending, (state, { payload }) => {
      state.isLoading = false;
    })

    builder.addCase(updateCategory.fulfilled, (state, { payload }) => {
      state.pickerValue = payload.categoryValue;
      state.recipes = payload.recipes as Recipe[];
      state.isLoading = true;
    })
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.error = action.error.message?.toString();
      state.isLoading = false;
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

export default categorySlice.reducer;

