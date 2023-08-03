import React,{ useState, useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import {SearchBar, Button} from 'react-native-elements';
import {ActionCreators} from '../actions';
import {bindActionCreators} from 'redux';
import {Recipe} from '../models/Recipe';
import { connect } from 'react-redux';
import RecipeCard from '../components/RecipeCard';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import styled from 'styled-components/native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import SkeletonList from '../components/common/SkeletonList';

interface RecipeProps {
  favorites: Recipe[],
  setFavorite: (recipe:Recipe)=>void,
  fetchFavorites: ()=>void,
  isLoading: boolean
 };
 
const RecipeFavorite = (props: RecipeProps) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  let { favorites, isLoading, fetchFavorites} = props;  

  const recipeClicked = (recipe: Recipe) => {
  
    navigation?.navigate('Detail' as never, {
      recipeId: recipe.idMeal,
      favorite: recipe.favorite
    } as never);
  }

  const recipeLiked = (recipeItem:  Recipe) => {
    //props.setFavorite(recipeItem);
    const {setFavorite, fetchFavorites} = props;
    setFavorite(recipeItem);
    setTimeout(()=>{ fetchFavorites() }, 1000);
  }

  useEffect(()=>{
    fetchFavorites();
  },[]);

  useEffect(()=>{
    fetchFavorites();
  },[isFocused])

  if(!isLoading) {
    return (
      <SkeletonList/>
    )
  }

  return (
    <Container>
      <View>
        {favorites ?<FlatList  data={favorites} keyExtractor={item => item["idMeal"].toString()} renderItem={({item}) => <RecipeCard likeRecipe={()=>{ recipeLiked(item)}} callRecipe={()=>{recipeClicked(item)}} size={1}  recipe={item} />} />:  null}
      </View>    
    </Container>
  )
}

const Container = styled.View`
flex:1
`
const mapStateToProps = (state: any) => {
  const { isLoading } = state.setLoading;
  const { favorites} = state.setFavorites;
  return {"isLoading": isLoading, "favorites":favorites};
}

const mapDispatchToProps = (dispatch: any) =>{
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeFavorite);