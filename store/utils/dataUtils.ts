
import { Recipe } from "../../models/Recipe";
import Api from '../../lib/api';
import {delay} from '../../lib/utils'
import {getRealmConnection} from '../../schema/realm';
//Recipe operations
export const getRecipesByCategory = async (category: string) => {
  const realm = await getRealmConnection();
  const recipeIds: string[] = realm.objects<Recipe[]>('RecipeLite').toJSON().map(recipe=> recipe.idMeal) as string[];
  const uri = `filter.php?c=${category}`;
  await delay(500);
  const response = await Api.get(uri,{});
  const data = response.data;
  //Sanitize and add flag here
  const meals = data["meals"];
  //We add this for our computation
  const recipes = meals.map((meal:any)=>{
    meal["favorite"] = recipeIds.includes(meal["idMeal"]);
    return meal; 
  });
  return recipes;
}
  
export const updateRecipeFavorite = async(recipe: Recipe) => {
  let realm = await getRealmConnection();
  const favorite = recipe.favorite;
  const recipeObject = {
    strMeal: recipe.strMeal,
    strMealThumb: recipe.strMealThumb,
    idMeal: recipe.idMeal,
    favorite: !favorite,
    date: new Date(),
  };
  realm.write(() => {
    if(favorite){
      let fetchedRecipe = realm.objects("RecipeLite").filtered('idMeal= $0', recipe.idMeal);
      realm.delete(fetchedRecipe);
    }else {
      realm.create("RecipeLite", recipeObject);
    }
  });
  return recipeObject.idMeal;
}