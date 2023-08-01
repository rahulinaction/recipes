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
import styled from 'styled-components/native';
import { realmConfig } from '../schema/realm';
import { useDispatch, useSelector} from "react-redux";

//Components
import RecipeCard from '../components/RecipeCard';
import SkeletonList from '../components/common/SkeletonList';

interface ListProps {
  fetchCategories: ()=>void,
  fetchFavorites: ()=>void,
  categories: RecipeCategory[],
  filteredCategories:  Array<PickerItem>,
  recipes: Recipe[],
  fetchRecipes: (_categoryName:string)=> void,
  pickerValue: PickerItem,
  setPickerValue: (_value: PickerItem)=>void,
  navigation: NavigationProp<ParamListBase>,
  init: boolean,
  setFavorite: (recipe: Recipe)=>void,
  isLoading: boolean 
};

interface ListState {
  isLoading: boolean| string,
  categories:RecipeCategory[],
  filteredCategories: Array<PickerItem>,
  recipes:Recipe[],
  numColumns: number,
  search: string,
  init: boolean
};


const RecipeList = (props: ListProps) => {
  const [ numColumns, setNumColumns] = useState<number>(1);
 // const [ recipes, setRecipes] = useState<Recipe[]>([]);
  const [ hasLoaded, setHasLoaded] = useState<boolean>(false);

  let { recipes, filteredCategories, pickerValue, isLoading} = props;  
   //   let {search, numColumns} = this.state;
  const data: Array<PickerItem> = filteredCategories;   
  const navigation = useNavigation();

  useEffect(()=>{
    props?.fetchCategories();
    props?.fetchFavorites();
  },[]);

  const recipeClicked = (recipe: Recipe) => {
    
    navigation?.navigate('Detail', {
      recipeId: recipe.idMeal,
      favorite: recipe.favorite
    });
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

//@todo move in selectors redux toolkit
const  mapStateToProps =(state: any) => {
  const { isLoading } = state.setLoading;
  const {categories, filteredCategories} = state.fetchCategories;
  let { pickerValue} = state.setPickerValue;
  const {recipes} = state.fetchRecipes;
  const cats = typeof categories!=="undefined"? categories: [];
  const filterCats = typeof filteredCategories!=="undefined"? filteredCategories: [];
  pickerValue = typeof pickerValue!=="undefined"? pickerValue: {label:"",value:""};
  return {"isLoading": isLoading, "categories": cats, "recipes": recipes, "filteredCategories": filterCats, pickerValue: pickerValue };
}

const mapDispatchToProps = (dispatch: any) =>{
  return bindActionCreators(ActionCreators, dispatch);
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
 

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);

