import React,{Component, useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {ActionCreators} from '../actions';
import {bindActionCreators} from 'redux';
import {AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import {RecipeCategory} from '../models/RecipeCategory'; 
import {Recipe} from '../models/Recipe';
import RNPickerSelect from 'react-native-picker-select';

//Components
import RecipeCard from '../components/RecipeCard';

interface ListProps {
    fetchCategories: any,
    categories: any,
    recipes: any,
    fetchRecipes: any,
    navigation: any  
};

interface ListState {
    isLoading: any,
    categories:RecipeCategory[],
    recipes:Recipe[]
};
class RecipeList extends Component<ListProps, ListState> {
    // Before the component mounts, we initialise our state

    constructor(props: ListProps) {
        super(props);
        this.recipeClicked = this.recipeClicked.bind(this);
    }

    getFilteredCategories() {
        let {categories} = this.props;
        let filteredCategories = [];
        if(typeof categories!=="undefined") {
            for(let i=0;i<categories.length;i++) {
                let category = categories[i];
                filteredCategories.push({"label":category.strCategory, "value": category.strCategory});
            } 
        }
        
        return filteredCategories;
    }
    // After the component did mount, we set the state each second.
    componentDidMount() {
        this.props.fetchCategories();
    }

    recipeClicked(id: number) {
        //Route for navigation
        let {navigation} = this.props;
        navigation.navigate('Detail', {
            recipeId: id
        });
    }
    // render will know everything!
    render() {
      let {categories, recipes} = this.props;  
      if(!categories) {
          categories = [];
      }

      if(!recipes) {
          recipes = []
      }

      console.log("The recipes is",recipes);

      return (
        <View style={styles.container}>
            <View style={styles.selectContainer}>
                <RNPickerSelect
                    style= {pickerStyle}
                    onValueChange={(value) => this.props.fetchRecipes(value)}
                    items={this.getFilteredCategories()}
                />
            {recipes ?<FlatList numColumns={1} data={recipes} keyExtractor={item => item["idMeal"]} renderItem={({item}) => <RecipeCard callRecipe={this.recipeClicked}  recipe={item} />} />:  null}
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

