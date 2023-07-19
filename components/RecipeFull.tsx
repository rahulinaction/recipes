import React,{Component, useState, useEffect} from 'react';
import {View,StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import {Image, Text} from 'react-native-elements';
import {Recipe} from '../models/Recipe';
import  AppConstants from  '../config/constants';
import RecipeIngredient from '../components/RecipeIngredient';

type RecipeProps = {
  recipe: any
};


const RecipeFull = ({recipe}: RecipeProps) => {

  let recipeContent = recipe[0];
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

  
  return(  
    <ScrollView nestedScrollEnabled = {true}>
      <View style={styles.container}> 
        <Text h3 style={styles.headerText}>{recipeContent.strMeal}</Text>
        <Image
            resizeMode="cover"
            style={styles.image}
            PlaceholderContent={<ActivityIndicator />}
            source={{ uri: recipeContent.strMealThumb }}
        />
        <Text style={styles.categoryText}>Category: {recipeContent.strCategory}</Text>
        <Text style={styles.categoryText}>Area: {recipeContent.strArea}</Text>
        <Text style={styles.ingredientHeader}>Used Ingredients</Text>
        <ScrollView style={styles.ingredientHolder}  horizontal={true}  nestedScrollEnabled = {true} scrollEventThrottle={16}  >  
          <View style={styles.ingredientInnerContainer}>
          {ingredients.map((ingredient)=>{
            return (
              <TouchableOpacity  onPress={()=>{

              }}>
              <View  style={styles.imageIngredientContainer} >
                <Image
                resizeMode="cover"
                style={styles.imageThumb}
                source={{ uri: ingredient.ingredientUrl }}
               />
              <Text style={styles.ingredientText}>{ingredient.ingredient}</Text>
             </View>
             </ TouchableOpacity>
            )
          })}
          </View>
        </ScrollView>
        <Text>{recipeContent.strInstructions}</Text>
          <Text h4 style={styles.proportionHeader}>Proportions</Text>
          {ingredients.map((ingredient, i) => {
            return (  
              <>
                <RecipeIngredient ingredient={ingredient} key={i} />
              </>
            );
          })}

      </View>
    </ScrollView>    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 200,
    marginBottom: 20
  },
  imageThumb: {
    width: 120,
    height: 120,
  },
  innerContainer: {
    flex: 1
  },
  headerText: {
    marginBottom: 20
  },
  ingredientHeader: {
    fontSize: 17, 
    marginTop: 20, 
    fontWeight:"bold", 
    marginBottom: 15
  },
  categoryText: {
    color: "blue",
    fontSize: 15,
    width:"100%",
    flex:1,
    marginBottom: 20
  },
  proportionHeader: {
    fontSize: 17, 
    marginTop: 20, 
    fontWeight:"bold", 
    marginBottom: 15
  },
  ingredientText: {
    fontWeight:"bold",
    textAlign:"center", 
    marginTop:10,
    fontSize:14
  },
  imageIngredientContainer: {
    marginHorizontal: 10
  },
  ingredientHolder: {
    marginBottom: 20
  },
  ingredientInnerContainer: {
    flexDirection:"row", 
    justifyContent:"center"
  }
});

export default RecipeFull;