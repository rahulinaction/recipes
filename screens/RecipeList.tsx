import React,{Component, useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {SearchBar, Button} from 'react-native-elements';
import {ActionCreators} from '../actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { RecipeCategory } from '../models/RecipeCategory'; 
import { Recipe } from '../models/Recipe';

import type { PickerItem } from 'react-native-woodpicker';
import { Picker } from 'react-native-woodpicker';

//Components
import RecipeCard from '../components/RecipeCard';

interface ListProps {
  fetchCategories: any,
  categories: RecipeCategory[],
  filteredCategories:  Array<PickerItem>,
  recipes: Recipe[],
  fetchRecipes: any,
  pickerValue: PickerItem,
  setPickerValue: any,
  navigation: any,
  init: boolean,
  setFavorite: any 
};

interface ListState {
  isLoading: any,
  categories:RecipeCategory[],
  filteredCategories: Array<PickerItem>,
  recipes:Recipe[],
  numColumns: number,
  search: string,
  init: boolean
};
class RecipeList extends Component<ListProps, ListState> {
    // Before the component mounts, we initialise our state
    
    constructor(props: ListProps) {
      super(props);
      this.state = {isLoading:"",categories:[], recipes: [], search: "",numColumns:1, init: true, filteredCategories: []};
      this.recipeClicked = this.recipeClicked.bind(this);
      this.recipeLiked =  this.recipeLiked.bind(this);
      this.categorySelected = this.categorySelected.bind(this);
    }
/*
    updateSearch(search: string){
        this.setState({ search });
    };*/

    categorySelected(value: PickerItem) {
      this.props.setPickerValue(value);
      this.props.fetchRecipes(value.value);
    }

    componentDidMount() {
      this.props.fetchCategories();
    }

    selectedView(value: string) {
      let numColumns = 1;
      if(value==='Grid') {
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
      let { recipes, filteredCategories, pickerValue} = this.props;  
      let {search, numColumns} = this.state;
      console.log('Filtered categories render is:',filteredCategories);
      if(!recipes) {
          recipes = []
      }

      const data: Array<PickerItem> = filteredCategories;   

      return (
        <View style={styles.container}>
          <View style={styles.selectContainer}>
  
              <Picker
                  item={pickerValue}
                  items={data}
                  onItemChange={this.categorySelected}
                  title="Categories"
                  placeholder="Select Categories"
                  isNullable={false}
              />
          </View>                
          <View style={{paddingHorizontal: 20}}>
              <Button title="List" style={{marginBottom: 15}} onPress={()=>{ this.selectedView("List")}} />
              <Button title="Grid" onPress={()=>{ this.selectedView("Grid")}} />
          </View>    
          {recipes ?<FlatList  key = {( this.state.numColumns==2 ) ? 1 : 0 } numColumns={numColumns} data={recipes} keyExtractor={item => item["idMeal"]} renderItem={({item}) => <RecipeCard likeRecipe={this.recipeLiked} callRecipe={this.recipeClicked} size={numColumns}  recipe={item} />} />:  null}
        </View>    
      )
    }
}

function mapStateToProps(state: any) {
   const { isLoading } = state.setLoading;
   const  {categories, filteredCategories} = state.fetchCategories;
   console.log('state values are',state);
   let { pickerValue} = state.setPickerValue;
   const {recipes} = state.fetchRecipes;
   const cats = typeof categories!=="undefined"? categories: [];
   const filterCats = typeof filteredCategories!=="undefined"? filteredCategories: [];
   pickerValue = typeof pickerValue!=="undefined"? pickerValue: {label:"",value:""};
   return {"isLoading": isLoading, "categories": cats, "recipes": recipes, "filteredCategories": filterCats, pickerValue: pickerValue };
}

function mapDispatchToProps(dispatch: any){
    return bindActionCreators(ActionCreators, dispatch);
}

const styles  = StyleSheet.create({
    container:{
        flex: 1
    },
    selectContainer : {
        marginTop: 40,
        height: 50,
        marginBottom: 40,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor:"red",
        borderWidth:1,
        borderRadius: 4
    }
});



export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);

