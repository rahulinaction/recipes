import {Recipe} from '../models/Recipe';

interface IActionType {
  type: string
};

export interface IActionRecipeFlag extends IActionType {
  flag?: boolean
};

export interface IActionRecipeDetail extends IActionType {
  recipe?: Recipe
}

export interface IActionRecipeLite extends IActionType {
  recipe: Recipe
}

export interface IActionRecipePicker extends IActionType {
  value: string
}

export interface IActionRecipes extends IActionType {
  recipes: Recipe[]
}


export interface IActionRecipeId extends IActionType {
  id: number
}

interface ICategoryValue {
  strCategory: string
}

export interface IActionCategory extends IActionType {
  categories: ICategoryValue[]
}

//Dispatches

export type DispatchLoadingFlag   = (arg: IActionRecipeFlag) => (IActionRecipeFlag);

export type DispatchRecipe = (arg: IActionRecipeDetail) => (IActionRecipeDetail);

export type DispatchRecipes   = (arg: IActionRecipes) => (IActionRecipes);

export type DetailDispatch = DispatchLoadingFlag | DispatchRecipe;