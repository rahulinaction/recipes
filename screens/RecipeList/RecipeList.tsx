import React,{ useEffect, useState } from 'react';
import {FlatList} from 'react-native';
import {Button} from 'react-native-elements';
import {  useDispatch } from 'react-redux';
import { RecipeCategory } from '../../models/RecipeCategory'; 
import { Recipe } from '../../models/Recipe';
import type { PickerItem } from 'react-native-woodpicker';
import { Picker } from 'react-native-woodpicker';
import {NavigationProp, ParamListBase, useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList} from '../../RootStackParams'
//Styled components
import {Container,StyledFlatList, ListButton, ButtonContainer, SelectContainer} from './RecipeList.style';
import {useAppSelector} from '../../store/index';
import {fetchCategories, updateCategory, setFavoriteRecipe} from '../../store/slices/categorySlice';
//Components
import RecipeCard from '../../components/RecipeCard';
import SkeletonList from '../../components/common/SkeletonList';

interface PickerValue {
  label: string,
  value: string
}

const RecipeList = () => {
  const [ numColumns, setNumColumns] = useState<number>(1); 
  const pickerValue = useAppSelector<PickerValue>((state) => state.category.pickerValue);
  const hasLoaded = useAppSelector<boolean>((state) => state.category.isLoading);
  const recipes = useAppSelector<Recipe[]>((state) => state.category.recipes);
  const categories = useAppSelector<RecipeCategory[]>((state) => state.category.categories);

  const filteredCategories = categories.map((category)=>{
    return {"label":category.strCategory, "value": category.strCategory}
  });
  const data: Array<PickerItem> = filteredCategories;   
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(()=>{
    //Fetches category and subsequent recipes
    dispatch(fetchCategories());
  },[]);

  const recipeClicked = (recipe: Recipe) => {
    const route = "Detail";
    navigation.navigate(route as never, {
      recipeId: recipe.idMeal,
      favorite: recipe.favorite
    } as never);
  }

  const recipeLiked = (recipeItem:  Recipe) => {
    dispatch(setFavoriteRecipe(recipeItem));
  }

  //Category selected
  const categorySelected = (value: PickerItem) =>{
    dispatch(updateCategory(value));
  }

  return (
    <Container>
    <SelectContainer>
      <Picker
        item={pickerValue}
        items={data}
        onItemChange={(pickedItem)=>{ categorySelected(pickedItem)}}
        title="Categories"
        placeholder="Select Categories"
        isNullable={false}
      />
    </SelectContainer>                
    <ButtonContainer>
      <ListButton title="List"  onPress={()=>{ setNumColumns(1)}} />
      <Button title="Grid" onPress={()=>{ setNumColumns(2)}} />
    </ButtonContainer>
    { hasLoaded && recipes ?<FlatList  contentContainerStyle={{alignItems:"center"}}  key = {( numColumns==2 ) ? 1 : 0 } numColumns={numColumns} data={recipes} keyExtractor={(item: Recipe) => item["idMeal"].toString()} renderItem={({item}) => <RecipeCard likeRecipe={()=>{recipeLiked(item)}} callRecipe= {()=>{recipeClicked(item)}} size={numColumns}  recipe={item} />} />: <SkeletonList />}
  </Container>    
  )
}

export default RecipeList;

