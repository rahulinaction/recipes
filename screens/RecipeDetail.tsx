import React,{Component, useState, useEffect} from 'react';
import {View} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import {bindActionCreators} from 'redux';
import RecipeFull from '../components/RecipeFull';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';


interface DetailProps {
   navigation: any,
   fetchRecipe: any,
   recipe: any,
   route: any,
   isLoading: boolean,
   setDetailLoading: any,
   setFavorite: any,
   favorite: string
};

interface DetailsState {
  isLoading: string | boolean,
  recipe: any
};

class RecipeDetail extends Component<DetailProps, DetailsState> {
    
  static navigationOptions = ({ navigation }: any) => ({
    
    headerRight:() => (
      <Icon name='heart' size={22}   color={"black"}  onPress={() => console.log("Favorite") } />
    )
  })

  constructor(props: DetailProps) {
    super(props);
  }


  componentDidMount() {
    let {route, fetchRecipe} = this.props;
    let recipeId = route.params.recipeId;
    //Testing for loader
    fetchRecipe(recipeId);
  }
  

  render() {
    let {recipe} = this.props;
    return(
      <View>       
      { recipe ? <RecipeFull recipe={recipe} /> : null }
      </View>    
    )
  }
   
}

const mapStateToProps = (state: any) =>{
  const { isLoading } = state.setDetailLoading;
  const  {recipe} = state.fetchRecipe;
  return {"isLoading": isLoading, "recipe": recipe};
}
 
const mapDispatchToProps =(dispatch: any) =>{
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);