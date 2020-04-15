import React,{Component, useState, useEffect} from 'react';
import {View,StyleSheet, ActivityIndicator, ScrollView} from 'react-native';
import {Card,Image, Text, Rating, AirbnbRating} from 'react-native-elements';
import {Recipe} from '../models/Recipe';

type Props = {
    recipe: any
};


const RecipeFull = ({recipe}: Props) => {
    let recipeContent = recipe[0];
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
                <AirbnbRating />
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
    categoryText: {
        color: "blue",
        fontSize: 15,
        marginBottom: 20
    }
});

export default RecipeFull;