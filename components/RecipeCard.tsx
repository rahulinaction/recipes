import React,{Component, useState, useEffect, useMemo} from 'react';
import { View, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Image, Text, Divider} from 'react-native-elements';
import {Recipe } from '../models/Recipe';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';


type RecipeCardProps = {
  recipe: Recipe,
  callRecipe: (_recipe: Recipe)=> void,
  size: number,
  likeRecipe: (_id: Recipe)=> void
};


const RecipeCard = ({recipe,size,callRecipe, likeRecipe}: RecipeCardProps) => {
    
  let likeColor = "#000";

  const RecipeImage = styled(Image).attrs({
    containerStyle: {
      width:size==1? 300:150,
      height: size==1?300:150
    }
  })``

  if(recipe.favorite) {
      likeColor = "#FF0000";
  }
  /**
   * 
   * 
   * 
   */

  return(
    < TouchableOpacity  onPress={()=>{ callRecipe(recipe) }}>
      <StyledCard title={recipe.strMeal}
          titleStyle={{
            fontSize: 13
          }}
          containerStyle ={size==1?styles.listContainer: styles.gridContainer}>
          
          <View style={styles.container}>
            <Image
              resizeMode="cover"
              style={size==1? styles.listImage: styles.gridImage}
              PlaceholderContent={<ActivityIndicator />}
              source={{ uri: recipe.strMealThumb }}
            />
            <RecipeText numberOfLines={1} h5>{recipe.strMeal}</RecipeText>
            <StyledDivider/>
            <LowerCardContainer>
              <ColumnContainer>
                <Icon name='heart'  size={18} color={likeColor} onPress={() => likeRecipe(recipe)} />
              </ColumnContainer>
              <ColumnContainer>
              </ColumnContainer>
            </LowerCardContainer>    
          </View>

      </StyledCard>
    </ TouchableOpacity>
  )
}

const ImageContainer = styled.View`
flex: 1;
margin-bottom: 20px;
alignItems:center;
`

const ColumnContainer = styled.View`
flex:1;

`
const DescriptionContainer = styled.View`
flex:1;
align-items:center;
`
const LowerCardContainer = styled.View`
flex:1;
flex-direction:row;
padding: 10px;`

const StyledDivider = styled(Divider)`
height:1px;
width:100%;
`
const RecipeText = styled(Text)`
font-size: 16px;
font-weight:bold;
margin: 20px;
`
const StyledCard = styled(Card)`

`

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center"
  },
  listImage: {
    width: 300,
    height: 300  
  },
  gridImage: {
    width: 150,
    height: 150
  },
  listContainer: {
    width: 350,
    paddingHorizontal: 0
  },
  gridContainer: {
    width: 170,
    paddingHorizontal: 0
  }
});

export default RecipeCard;