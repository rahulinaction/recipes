import { createAsyncThunk ,createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RecipeCategory } from '../../models/RecipeCategory'
import Api from '../../lib/api'
import { delay } from '../../lib/utils'

interface RecipeState  {
  recipe: any,
  error: string | undefined 
}

const initialState: RecipeState = {
  recipe: null,
  error: ""
}

export const fetchRecipe = createAsyncThunk("recipe/fetch",async(id:number ,thunkAPI)=>{
  const uri = 'lookup.php?i='+id;
//    await delay(500);
  const response = await Api.get(uri,{});
  const data = response.data;
  return data["meals"];
});

const recipeDetailSlice = createSlice({
  name: 'recipeDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(fetchRecipe.fulfilled, (state, { payload }) => {
      state.recipe = payload;
    })
    builder.addCase(fetchRecipe.rejected, (state, action) => {
      state.error = action.error.message?.toString();
    })
  },
});

export default recipeDetailSlice.reducer;