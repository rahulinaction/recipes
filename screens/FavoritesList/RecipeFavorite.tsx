import React,{useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {Recipe} from '../../models/Recipe';
import RecipeCard from '../../components/RecipeCard';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import SkeletonList from '../../components/common/SkeletonList';
import { Container } from '../../components/styles/general.style';
import { fetchRecipes, setFavoriteRecipe } from '../../store/slices/recipeFavoriteSlice';
import { useAppSelector, useAppDispatch } from '../../store/index';


const RecipeFavorite = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const recipes = useAppSelector<Recipe[]>(state=>state.recipeFavorite.recipes);
  const hasLoaded = useAppSelector<boolean>(state=>state.recipeFavorite.hasLoaded);
  
  const recipeClicked = (recipe: Recipe) => {  
    navigation?.navigate('Detail' as never, {
      recipeId: recipe.idMeal,
      favorite: recipe.favorite
    } as never);
  }

  const recipeLiked = (recipe:  Recipe) => {
    dispatch(setFavoriteRecipe(recipe));
    setTimeout(()=>{ dispatch(fetchRecipes()) }, 1000);
  }

  useEffect(()=>{
    dispatch(fetchRecipes());
  },[]);

  useEffect(()=>{
    dispatch(fetchRecipes());
  },[isFocused])

  if(!hasLoaded) {
    return (
      <SkeletonList/>
    )
  }

  return (
    <Container>
      <View>
        {hasLoaded && recipes && recipes.length>0  ?<FlatList  data={recipes} keyExtractor={item => item["idMeal"].toString()} renderItem={({item}) => <RecipeCard likeRecipe={()=>{ recipeLiked(item)}} callRecipe={()=>{recipeClicked(item)}} size={1}  recipe={item} />} />:  null}
      </View>    
    </Container>
  )
}

export default  RecipeFavorite;