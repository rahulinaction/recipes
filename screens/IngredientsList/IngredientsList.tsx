import React, {useEffect, useState} from 'react';
import { View, FlatList} from 'react-native';
import RecipeFull from '../../components/RecipeFull';
//Creating hooks components
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import { Recipe } from '../../models/Recipe';
import { useDispatch } from 'react-redux';
import RecipeCard from '../../components/RecipeCard';
import { useNavigation, useIsFocused, RouteProp } from '@react-navigation/native';
import { useAppSelector } from '../../store/index';

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
 
 
const IngredientsList = (props: RecipeProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const recipes = useAppSelector<Recipe[]>((state) => state.ingredient.recipes);
  const hasLoaded = useAppSelector<boolean>((state) => state.ingredient.hasLoaded);
  
  useEffect(()=>{
    const {route} = props;
    const ingredient = route?.params?.ingredient;
    if(ingredient){
      dispatch(fetchIngredients(ingredient));
    }
  },[]);
  
  const recipeClicked = (recipe: Recipe) => {
    navigation?.navigate('IngredientsDetail' as never, {
      recipeId: recipe.idMeal,
      favorite: recipe.favorite
    } as never);
  }

  const recipeLiked = (recipeItem:  Recipe) => {
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
      {recipes ?<FlatList  data={recipes} keyExtractor={item => item["idMeal"].toString()} renderItem={({item}) => <RecipeCard likeRecipe={()=>{ recipeLiked(item)}} callRecipe={()=>{recipeClicked(item)}} size={1}  recipe={item} />} />:  null}
    </View>    
  </Container>
  )  
}

export default IngredientsList;