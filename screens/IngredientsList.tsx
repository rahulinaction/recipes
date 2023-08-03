import React, {useEffect, useState} from 'react';
import { View, FlatList} from 'react-native';
import RecipeFull from '../components/RecipeFull';
//Creating hooks components
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import { Recipe } from '../models/Recipe';
import {ActionCreators} from '../actions';
import {bindActionCreators} from 'redux';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import RecipeCard from '../components/RecipeCard';

import { useNavigation, useIsFocused, RouteProp } from '@react-navigation/native';
import SkeletonList from '../components/common/SkeletonList';

type RouteParams = {
  ingredient?: string;
}

interface RecipeProps {
  //route: RouteProp<Record<string, RouteParams>, ''>,
  route: any,
  recipes: Recipe[],
  setFavorite: (recipe:Recipe)=>void,
  fetchFavorites: ()=>void,
  fetchIngredients:(ingredient: string) => void,
  isLoading: boolean
 };
 
 
const IngredientsList = (props: RecipeProps) => {
  const navigation = useNavigation();
  const { recipes }  = props;
  
  useEffect(()=>{
    const {route, fetchIngredients} = props;
    const ingredient = route?.params?.ingredient;
    if(ingredient){
      fetchIngredients(ingredient);
    }
  },[]);
  
  const recipeClicked = (recipe: Recipe) => {

    navigation?.navigate('IngredientsDetail' as never, {
      recipeId: recipe.idMeal,
      favorite: recipe.favorite
    } as never);
  }

  const recipeLiked = (recipeItem:  Recipe) => {
    props.setFavorite(recipeItem);
  }

  return (
    <Container>
    <View>
      {recipes ?<FlatList  data={recipes} keyExtractor={item => item["idMeal"].toString()} renderItem={({item}) => <RecipeCard likeRecipe={()=>{ recipeLiked(item)}} callRecipe={()=>{recipeClicked(item)}} size={1}  recipe={item} />} />:  null}
    </View>    
  </Container>
  )  
}

const Container = styled.View`
  flex:1;
`;

const mapStateToProps = (state: any) => {
  const { isLoading } = state.setLoading;
  const { recipes} = state.setIngredientRecipes;
  return {"isLoading": isLoading, "recipes":recipes};
}

const mapDispatchToProps = (dispatch: any) =>{
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsList);;