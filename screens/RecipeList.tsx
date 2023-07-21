import React,{Component } from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {SearchBar, Button} from 'react-native-elements';
import {ActionCreators} from '../actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { RecipeCategory } from '../models/RecipeCategory'; 
import { Recipe } from '../models/Recipe';
import type { PickerItem } from 'react-native-woodpicker';
import { Picker } from 'react-native-woodpicker';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import styled from 'styled-components/native';
//Components
import RecipeCard from '../components/RecipeCard';
import SkeletonList from '../components/common/SkeletonList';

interface ListProps {
  fetchCategories: ()=>void,
  categories: RecipeCategory[],
  filteredCategories:  Array<PickerItem>,
  recipes: Recipe[],
  fetchRecipes: (_categoryName:string)=> void,
  pickerValue: PickerItem,
  setPickerValue: (_value: PickerItem)=>void,
  navigation: NavigationProp<ParamListBase>,
  init: boolean,
  setFavorite: (_id: number)=>void,
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

const gridValue = 'Grid';

class RecipeList extends Component<ListProps, ListState> {
    // Before the component mounts, we initialise our state
    constructor(props: ListProps) {
      super(props);
      this.state = {isLoading: false,categories:[], recipes: [], search: "", numColumns:1, init: true, filteredCategories: []};
      this.recipeClicked = this.recipeClicked.bind(this);
      this.recipeLiked =  this.recipeLiked.bind(this);
      this.categorySelected = this.categorySelected.bind(this);
    }
/*
    updateSearch(search: string){
        this.setState({ search });
    };*/
//Fetching value from picker
    categorySelected(value: PickerItem) {
      this.props.setPickerValue(value);
      this.props.fetchRecipes(value.value);
    }

    componentDidMount() {
      this.props.fetchCategories();
    }

    selectedView(value: string) {
      let numColumns = 1;
      if(value===gridValue) {
        numColumns = 2;
      }
      this.setState({
        numColumns: numColumns
      });
    }

    recipeClicked(recipe: Recipe) {
      let {navigation} = this.props;
      navigation.navigate('Detail', {
        recipeId: recipe.idMeal,
        favorite: recipe.favorite
      });
    }

    recipeLiked(id:  number) {
      this.props.setFavorite(id);
    }

    // render will know everything!
    render() {
      let { recipes, filteredCategories, pickerValue, isLoading} = this.props;  
      let {search, numColumns} = this.state;
        
      if(!recipes) {
        recipes = []
      }


      const data: Array<PickerItem> = filteredCategories;   

      return (
        <Container>
          <SelectContainer>
            <Picker
              item={pickerValue}
              items={data}
              onItemChange={this.categorySelected}
              title="Categories"
              placeholder="Select Categories"
              isNullable={false}
            />
          </SelectContainer>                
          <ButtonContainer>
            <ListButton title="List"  onPress={()=>{ this.selectedView("List")}} />
            <Button title="Grid" onPress={()=>{ this.selectedView("Grid")}} />
          </ButtonContainer>    
          { isLoading && recipes ?<FlatList  key = {( this.state.numColumns==2 ) ? 1 : 0 } numColumns={numColumns} data={recipes} keyExtractor={(item: Recipe) => item["idMeal"].toString()} renderItem={({item}) => <RecipeCard likeRecipe={this.recipeLiked} callRecipe={this.recipeClicked} size={numColumns}  recipe={item} />} />:  <SkeletonList/>}
        </Container>    
      )
    }
}

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
  flex:1
`;

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

