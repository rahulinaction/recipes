import React,{Component, useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, AsyncStorage} from 'react-native';
import {SearchBar, Button} from 'react-native-elements';
import {ActionCreators} from '../actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {RecipeCategory} from '../models/RecipeCategory'; 
import {Recipe} from '../models/Recipe';
import RNPickerSelect from 'react-native-picker-select';

//Components
import RecipeCard from '../components/RecipeCard';
import { throwStatement } from '@babel/types';

interface ListProps {
    fetchCategories: any,
    categories: any,
    recipes: any,
    fetchRecipes: any,
    navigation: any,
    init: boolean,
    setFavorite: any 
};

interface ListState {
    isLoading: any,
    categories:RecipeCategory[],
    recipes:Recipe[],
    numColumns: number,
    search: string,
    init: boolean,
    pickerValue: any
};
class RecipeList extends Component<ListProps, ListState> {
    // Before the component mounts, we initialise our state
    
    constructor(props: ListProps) {
        super(props);
        this.state = {isLoading:"",categories:[], recipes: [], search: "",numColumns:1, init: true, pickerValue: ""};
        this.recipeClicked = this.recipeClicked.bind(this);
        this.recipeLiked =  this.recipeLiked.bind(this);
        this.getFilteredCategories = this.getFilteredCategories.bind(this);
        this.recipeSelected = this.recipeSelected.bind(this);
    }
/*
    updateSearch(search: string){
        this.setState({ search });
    };*/

    getFilteredCategories() {
        let {categories} = this.props;
        let {init} = this.state;
        let filteredCategories = [];
        if(typeof categories!=="undefined") {
            for(let i=0;i<categories.length;i++) {
                let category = categories[i];
                filteredCategories.push({"label":category.strCategory, "value": category.strCategory});
            } 
        }
        if(init && filteredCategories.length > 0  ){
            let initialValue = filteredCategories[0].label;
            this.setState({
                init: false,
                pickerValue: initialValue
            });
        } 
        
        return filteredCategories;
    }

    recipeSelected(value: string) {
        this.setState({
            pickerValue: value
        });
        this.props.fetchRecipes(value);
    }

    // After the component did mount, we set the state each second.
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
    recipeClicked(id: number) {
  
       let {navigation} = this.props;
        navigation.navigate('Detail', {
            recipeId: id
        });
    }

    recipeLiked(id:  number) {
        console.log("Recipe liked ",id);
        this.props.setFavorite(id);
    }
    // render will know everything!
    render() {
      let {categories, recipes} = this.props;  
      let {search, numColumns, pickerValue} = this.state;
      if(!categories) {
          categories = [];
      }

      if(!recipes) {
          recipes = []
      }

      return (
        <View style={styles.container}>
            <View style={styles.selectContainer}>
                <RNPickerSelect
                    style= {pickerStyle}
                    onValueChange={(value) =>{ 
                        this.recipeSelected(value)
                    }}
                    value={pickerValue}
                    items={this.getFilteredCategories()}
                />
                
                <View>
                    <Button title="List" style={{marginBottom: 15}} onPress={()=>{ this.selectedView("List")}} />
                    <Button title="Grid" onPress={()=>{ this.selectedView("Grid")}} />
                </View>    
            {recipes ?<FlatList  key = {( this.state.numColumns==2 ) ? 1 : 0 } numColumns={numColumns} data={recipes} keyExtractor={item => item["idMeal"]} renderItem={({item}) => <RecipeCard likeRecipe={this.recipeLiked} callRecipe={this.recipeClicked} size={numColumns}  recipe={item} />} />:  null}
            </View>    
        </View>    
      )
    }
}

function mapStateToProps(state: any) {
   const { isLoading } = state.setLoading;
   const  {categories} = state.fetchCategories;
   const {recipes} = state.fetchRecipes;
   return {"isLoading": isLoading, "categories": categories, "recipes": recipes};
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
        marginBottom: 40,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor:"red"
    }
});

const pickerStyle = {
	inputIOS: {
		color: 'black',
		paddingTop: 13,
		paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 2,
        borderColor: "gray",
        borderRadius: 6,
        marginBottom: 40
	},
	inputAndroid: {
		color: 'black',
	},
	placeholderColor: 'white'
};
    

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);

