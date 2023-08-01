import React, { useState, useCallback} from 'react';
import {View, ActivityIndicator, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {Image, Text} from 'react-native-elements';
import {Recipe} from '../models/Recipe';
import  AppConstants from  '../config/constants';
import RecipeIngredient from '../components/RecipeIngredient';
import styled from 'styled-components/native';
import YoutubePlayer from "react-native-youtube-iframe";
import { useNavigation, RouteProp } from '@react-navigation/native';

type RecipeProps = {
  recipe: any
};

const RecipeFull = ({recipe}: RecipeProps) => {
  
  let recipeContent = recipe[0];
  const [playing, setPlaying] = useState(false);
  const navigation = useNavigation();
  let youtubeId = recipeContent?.strYoutube? recipeContent?.strYoutube.split("=")[1] : null;
  const userIngredientsText = 'Used Ingredients';
  let ingredients = [];
  if(recipeContent) {
    for(let i=1;i<=20;i++) {
      let currentIngredient = recipeContent["strIngredient"+i];
      let currentPortion = recipeContent["strMeasure"+i];
      if(currentIngredient!=="") {
        const ingredientUrl  =   AppConstants.ingredientUrl+encodeURIComponent(currentIngredient)+"-small.png";
        ingredients.push({ "ingredientUrl": ingredientUrl, "ingredient":currentIngredient, "portion":currentPortion}) 
      }
    }
  }

  //The below 2 methods are used to handle video playing youtube component
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);
  
  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return(  
    <ScrollView nestedScrollEnabled = {true}>
      <Container> 
        <HeaderText h3 >{recipeContent.strMeal}</HeaderText>
        <LargeImage
          resizeMode="cover"
          PlaceholderContent={<ActivityIndicator />}
          source={{ uri: recipeContent.strMealThumb }}
        />
        <InfoText key={"Category"} >Category: {recipeContent.strCategory}</InfoText>
        <InfoText key={"CategoryAnswer"}>Area: {recipeContent.strArea}</InfoText>
        <IngredientText key={"IngredientsText"}>{userIngredientsText}</IngredientText>
        <IngredientHolder key={"IngredientHolder"}  horizontal={true}  nestedScrollEnabled = {true} scrollEventThrottle={16}  >  
          <IngredientInnerContainer>
          {ingredients.map((_ingredient, index)=>{
            const { ingredient, ingredientUrl} = _ingredient;
            return (
              <TouchableOpacity onPress={()=>{
                navigation?.navigate('IngredientsList', {
                  ingredient: ingredient,
                });
              }} key={ingredient?.toString()+"_"+index} >
                <IngredientItem key={ingredient?.toString()+"_item_"+index} >
                  <SmallImage
                    resizeMode="cover"
                    source={{ uri: ingredientUrl }}
                />
                <IngredientText>{ingredient}</IngredientText>
              </IngredientItem>
             </ TouchableOpacity>
            )
          })}
          </IngredientInnerContainer>
        </IngredientHolder>
        {youtubeId ?
        <YTContainer>
        <YoutubePlayer
          height={300}
          style={{ width:"100%"}}
          play={playing}
          videoId={youtubeId}
          onChangeState={onStateChange}
        /></YTContainer>: null}
        <StyledText>{recipeContent.strInstructions}</StyledText>
          <ProportionText h4 >Proportions</ProportionText>
          {ingredients.map((ingredient, i: number) => {
            return (  
              <>
                <RecipeIngredient ingredientContent={ingredient} key={"Proportion_"+ingredient?.ingredient} />
              </>
            );
          })}

      </Container>
    </ScrollView>    
  )
}

const StyledText = styled(Text)``;

const HeaderText = styled(StyledText)`
margin-bottom: 20px;
`
const InfoText = styled(StyledText)`
color: blue;
font-size: 15px;
width:100%;
flex:1;
margin-bottom: 20px;
`
const IngredientText = styled(StyledText)`
font-size: 17px; 
margin-top: 20px; 
font-weight:bold;
margin-bottom: 15px;
`

const IngredientHolder = styled.ScrollView`
font-size: 17px; 
margin-top: 20px; 
font-weight:bold; 
margin-bottom: 15px;
`
const IngredientInnerContainer = styled.View`
flex-direction: row; 
justify-content:center;
`
const IngredientItem = styled.View`
margin-horizontal: 10px;
`
const ProportionText = styled(StyledText)`
font-size: 17px;
margin-top: 20px; 
font-weight:bold; 
margin-bottom: 15px;
`

const LargeImage = styled(Image)`
width: 350px;
height: 200px;
margin-bottom: 20px;
`

const SmallImage = styled(Image)`
width: 120px;
height: 120px;
`

const Container = styled.View`
flex: 1;
margin: 20px;
align-items: center;
`
const YTContainer = styled.View`
width: 100%;
`


export default RecipeFull;