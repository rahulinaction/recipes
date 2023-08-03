import React,{Component, useEffect, useState } from 'react';
import {FlatList} from 'react-native';
import {Button} from 'react-native-elements';
import {ActionCreators} from '../actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { RecipeCategory } from '../models/RecipeCategory'; 
import { Recipe } from '../models/Recipe';
import type { PickerItem } from 'react-native-woodpicker';
import { Picker } from 'react-native-woodpicker';
import {NavigationProp, ParamListBase, useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList} from '../RootStackParams'
import styled from 'styled-components/native';
import { realmConfig } from '../schema/realm';
import { useDispatch, useSelector} from "react-redux";
//Components
import RecipeCard from '../components/RecipeCard';
import SkeletonList from '../components/common/SkeletonList';

interface ListProps {
  categories: RecipeCategory[],
  filteredCategories:  Array<PickerItem>,
  recipes: Recipe[],
  pickerValue: PickerItem,
  isLoading: boolean,
  fetchRecipes: any,
  fetchCategories: ()=>void,
  fetchFavorites: ()=>void,
  setPickerValue: (_value: PickerItem)=>void,
  setFavorite: (recipe: Recipe)=>void
};

const RecipeList = (props: ListProps) => {
  const [ numColumns, setNumColumns] = useState<number>(1);
  let { recipes, filteredCategories, pickerValue, isLoading} = props;  
  const data: Array<PickerItem> = filteredCategories;   
  const navigation = useNavigation();

  useEffect(()=>{
    props?.fetchCategories();
    props?.fetchFavorites();
  },[]);

  const recipeClicked = (recipe: Recipe) => {
    const route = "Detail";
    navigation.navigate(route as never, {
      recipeId: recipe.idMeal,
      favorite: recipe.favorite
    } as never);
  }

  const recipeLiked = (recipeItem:  Recipe) => {
    props.setFavorite(recipeItem);
  }

  const categorySelected = (value: PickerItem) =>{
    props.setPickerValue(value);
    props.fetchRecipes(value.value);
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
    { isLoading && recipes ?<FlatList  contentContainerStyle={{alignItems:"center"}}  key = {( numColumns==2 ) ? 1 : 0 } numColumns={numColumns} data={recipes} keyExtractor={(item: Recipe) => item["idMeal"].toString()} renderItem={({item}) => <RecipeCard likeRecipe={()=>{recipeLiked(item)}} callRecipe= {()=>{recipeClicked(item)}} size={numColumns}  recipe={item} />} />: <SkeletonList />}
  </Container>    
  )
}


//Adding styled components
const Container = styled.View`
  flex:1;
`;

const StyledFlatList = styled.FlatList`
  marginHorizontal: 10;
`
const ListButton = styled(Button).attrs({
  containerStyle: {
    marginBottom:15
  }
})``

const ButtonContainer = styled.View`
padding-horizontal: 20px`;


const SelectContainer = styled.View`
margin-top: 40px;
height: 50px;
margin-bottom: 40px;
margin-horizontal: 20px;
padding: 10px;
border-color:red;
border-width:1px;
border-radius: 4px;
`;

//@todo move in selectors redux toolkit
const  mapStateToProps =(state: any) => {
  const { isLoading } = state.setLoading;
  const {recipes} = state.fetchRecipes;
  let {categories, filteredCategories} = state.fetchCategories;
  let { pickerValue} = state.setPickerValue;
  categories = typeof categories!=="undefined"? categories: [];
  filteredCategories = typeof filteredCategories!=="undefined"? filteredCategories: [];
  pickerValue = typeof pickerValue!=="undefined"? pickerValue: {label:"",value:""};
  return {isLoading, categories, recipes, filteredCategories, pickerValue };
}

const mapDispatchToProps = (dispatch: any) =>{
  return bindActionCreators(ActionCreators, dispatch);
}

export default  connect(mapStateToProps, mapDispatchToProps)(RecipeList);

