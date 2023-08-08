import React,{Component, useState, useEffect} from 'react';
import { View } from 'react-native';
import RecipeFull from '../../components/RecipeFull';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../../store/index';
import { fetchRecipe } from '../../store/slices/recipeDetailSlice';
type RouteParams = {
  recipeId?: string;
}

interface RecipeProps {
  route: any
};
//RouteProp<Record<string, RouteParams>, ''>

const RecipeDetail = (props:RecipeProps) => {
  const dispatch = useAppDispatch();
  const recipe = useAppSelector((state) => state.recipeDetail.recipe);;
  /*static navigationOptions = ({ navigation }: any) => ({
    headerRight:() => (
      <Icon name='heart' size={22}   color={"red"}  onPress={() => console.log("Favorite") } />
    )
  })*/

  useEffect(()=>{
    let {route} = props;
    let recipeId = route?.params?.recipeId;
    if(recipeId) {
      dispatch(fetchRecipe(recipeId));
    }

  },[]);
  

  return (
    <View>       
    { recipe ? <RecipeFull  recipe={recipe} /> : null }
    </View>   
  )
}

export default RecipeDetail;