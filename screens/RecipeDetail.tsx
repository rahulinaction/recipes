import React,{Component, useState, useEffect} from 'react';
import {Text, ActivityIndicator, View, Button, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import {ActionCreators} from '../actions';
import {bindActionCreators} from 'redux';
import RecipeFull from '../components/RecipeFull';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';

interface DetailProps {
   navigation: any,
   fetchRecipe: any,
   recipe: any,
   isLoading: any,
   setDetailLoading: any,
   setFavorite: any,
   favorite: string
};

interface DetailsState {
    isLoading: any,
    recipe: any
};

class RecipeDetail extends Component<DetailProps, DetailsState> {
    
    static navigationOptions = ({ navigation }: { navigation: NavigationScreenProp<NavigationRoute<DetailProps>, DetailProps>}) => ({
        
        headerRight:() => (
            <Icon name='heart' size={22} iconStyle={{marginRight:"20"}}  color={navigation.getParam("favorite")?"red":"black"}  onPress={() => console.log("Favorite") } />
        )
    })

    constructor(props: DetailProps) {
        super(props);
    }


    componentDidMount() {
        let {navigation, fetchRecipe} = this.props;
        let recipeId = navigation.getParam("recipeId");
        //Testing for loader
        fetchRecipe(recipeId);
    }
    

    render() {
        let {recipe, navigation, isLoading, setFavorite} = this.props;

        return(
            <View>       
            { recipe ? <RecipeFull recipe={recipe} /> : null }
            </View>    
        )
    }
   
}

const styles = StyleSheet.create({
    icon: {"marginRight": 20}
})

function mapStateToProps(state: any) {
    const { isLoading } = state.setDetailLoading;
    const  {recipe} = state.fetchRecipe;
    return {"isLoading": isLoading, "recipe": recipe};
}
 
function mapDispatchToProps(dispatch: any){
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);