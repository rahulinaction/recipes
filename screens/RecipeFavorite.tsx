import React,{Component, useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, AsyncStorage} from 'react-native';
import {SearchBar, Button} from 'react-native-elements';
import {ActionCreators} from '../actions';
import {bindActionCreators} from 'redux';
import {Recipe} from '../models/Recipe';
import { connect } from 'react-redux';
import RecipeCard from '../components/RecipeCard';

interface FavoriteProps {
    navigation: any,
    recipes: any,
    setFavorite: any,
    fetchFavorites: any
 };
 
 interface FavoriteState {
     isLoading: any,
     recipes: Recipe[]
 };
 
class RecipeFavorite extends Component<FavoriteProps, FavoriteState> {
    
    constructor(props: FavoriteProps) {
        super(props);
        this.recipeClicked = this.recipeClicked.bind(this);
        this.recipeLiked =  this.recipeLiked.bind(this);
        this.onScreenFocus = this.onScreenFocus.bind(this);
        this.state = {isLoading:"", recipes: []};

    }

    componentDidMount() {
        const {navigation} = this.props;
        navigation.addListener('didFocus', this.onScreenFocus)
    }

    onScreenFocus() {
        this.props.fetchFavorites();
    }

    recipeClicked(recipe: Recipe) {
  
        let {navigation} = this.props;
         navigation.navigate('Detail', {
             recipeId: recipe.idMeal,
             favorite: recipe.favorite
        });
    }
 
    recipeLiked(id:  number) {
        const {setFavorite, fetchFavorites} = this.props;
        setFavorite(id);
        setTimeout(function(){ fetchFavorites() }, 1000);
    }

    render() {
        let {recipes} = this.props;  
        return(
            <View style={styles.container}>
                <View>
                    {recipes ?<FlatList  data={recipes} keyExtractor={item => item["idMeal"]} renderItem={({item}) => <RecipeCard likeRecipe={this.recipeLiked} callRecipe={this.recipeClicked} size={1}  recipe={item} />} />:  null}
                </View>    
            </View>
        );
    }
    
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


function mapStateToProps(state: any) {
    const { isLoading } = state.setDetailLoading;
    const {favorites} = state.fetchRecipes;
   // const  {recipe} = state.fetchRecipe;
    return {"isLoading": isLoading, "recipes": favorites};
}

function mapDispatchToProps(dispatch: any){
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeFavorite);;