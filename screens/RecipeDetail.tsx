import React,{Component, useState, useEffect} from 'react';
import {Text, ActivityIndicator, View, Button} from 'react-native';
import { connect } from 'react-redux';
import {ActionCreators} from '../actions';
import {bindActionCreators} from 'redux';
import RecipeFull from '../components/RecipeFull';
interface DetailProps {
   navigation: any,
   fetchRecipe: any,
   recipe: any,
   isLoading: any,
   setDetailLoading: any
};

interface DetailsState {
    isLoading: any,
    recipe: any
};

class RecipeDetail extends Component<DetailProps, DetailsState> {
    
    constructor(props: DetailProps) {
        super(props);
    }

    componentDidMount() {
        let {navigation, fetchRecipe, setDetailLoading} = this.props;
        let recipeId = navigation.getParam("recipeId");
        //Testing for loader
        fetchRecipe(recipeId);
        //setDetailLoading(true);
        //setTimeout(function(){ fetchRecipe(recipeId)}, 3000);
    }

    render() {
        let {recipe, navigation, isLoading} = this.props;

        return(
            <View>
            <Button title="Favorite" onPress={()=>{ navigation.navigate("Favorite")}}/>        
            { recipe ? <RecipeFull recipe={recipe} /> : null }
            </View>    
        )
    }
   
}


function mapStateToProps(state: any) {
    const { isLoading } = state.setDetailLoading;
    const  {recipe} = state.fetchRecipe;
    return {"isLoading": isLoading, "recipe": recipe};
}
 
function mapDispatchToProps(dispatch: any){
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);