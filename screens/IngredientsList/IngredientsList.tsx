import React,{ memo, useEffect, useState} from 'react';
import { View, FlatList} from 'react-native';
//Creating hooks components
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import { Recipe } from '../../models/Recipe';
import RecipeCard from '../../components/RecipeCard';
import { useNavigation, useIsFocused, RouteProp } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../../store/index';

import SkeletonList from '../../components/common/SkeletonList';
import { Container } from '../../components/styles/general.style';
import { fetchIngredients, setFavoriteRecipe } from '../../store/slices/ingredientSlice';
type RouteParams = {
  ingredient?: string;
}

interface RecipeProps {
  //route: RouteProp<Record<string, RouteParams>, ''>,
  route: any
 };

 interface RecipeItem {
  item: Recipe
}

 
 
const IngredientsList = (props: RecipeProps) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const recipes = useAppSelector<Recipe[]>((state) => state.ingredient.recipes);
  const hasLoaded = useAppSelector<boolean>((state) => state.ingredient.hasLoaded);
  
  useEffect(()=>{
    const {route} = props;
    const ingredient = route?.params?.ingredient;
    if(ingredient){
      dispatch(fetchIngredients(ingredient));
    }
  },[]);
  
  const recipeClicked = (recipe: Recipe):void => {
    navigation?.navigate('IngredientsDetail' as never, {
      recipeId: recipe.idMeal,
      favorite: recipe.favorite
    } as never);
  }

  const RenderItem = ({item}:RecipeItem): JSX.Element =>{
    return (
      <RecipeCard likeRecipe={()=>{ recipeLiked(item)}} callRecipe={()=>{recipeClicked(item)}} size={1}  recipe={item} />
    )
  }

  const recipeLiked = (recipeItem:  Recipe):void => {
    dispatch(setFavoriteRecipe(recipeItem));
  }

  if(!hasLoaded) {
    return (
      <SkeletonList/>
    )
  }

  return (
    <Container>
    <View>
      {recipes && recipes.length >0  ?<FlatList  
                                        data={recipes} 
                                        maxToRenderPerBatch={5}
                                        keyExtractor={(item: Recipe) => item?.idMeal.toString()} 
                                        renderItem={RenderItem} />:  null}
    </View>    
  </Container>
  )  
}

export default IngredientsList;