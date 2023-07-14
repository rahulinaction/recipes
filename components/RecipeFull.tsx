import React,{Component, useState, useEffect} from 'react';
import {View,StyleSheet, ActivityIndicator, ScrollView} from 'react-native';
import {Card,Image, Text} from 'react-native-elements';
import {Recipe} from '../models/Recipe';
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
        ingredients.push({"ingredient":currentIngredient, "portion":currentPortion}) 
      }
    }
  }

    
  return(
    <ScrollView>
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
        <Text>{recipeContent.strInstructions}</Text>
          <Text h4 style={styles.ingredientHeader}>Ingredients</Text>
          {ingredients.map((ingredient, i) => {
              return (
                  <RecipeIngredient ingredient={ingredient} key={i} />
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
  innerContainer: {
    flex: 1
  },
  headerText: {
    marginBottom: 20
  },
  ingredientHeader: {
    paddingBottom: 20,
    paddingTop: 20
  },
  categoryText: {
    color: "blue",
    fontSize: 15,
    marginBottom: 20
  }
});

export default RecipeFull;