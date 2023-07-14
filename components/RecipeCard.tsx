import React,{Component, useState, useEffect, useMemo} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Image, Divider} from 'react-native-elements';
import {Recipe } from '../models/Recipe';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';


type RecipeCardProps = {
  recipe: Recipe,
  callRecipe: (_recipe: Recipe)=> void,
  size: number,
  likeRecipe: (_id: number)=> void
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

  return(
    < TouchableOpacity onPress={()=>{ callRecipe(recipe) }}>
      <Card title={recipe.strMeal}
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
            <Divider style={{ backgroundColor: 'gray' }} />
            <LowerCardContainer>
              <ColumnContainer>
                <Text>Like:</Text>
              </ColumnContainer>
              <ColumnContainer>
                <Icon name='heart' size={18} color={likeColor} onPress={() => likeRecipe(recipe.idMeal)} />
              </ColumnContainer>
            </LowerCardContainer>    
          </View>
      </Card>
    </ TouchableOpacity>
  )
}

const ColumnContainer = styled.View`
flex:1
`

const LowerCardContainer = styled.View`
flex:1;
flex-direction:row;
padding: 10px`


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
      width: 350
    },
    gridContainer: {
      width: 170
    }
});

export default RecipeCard;