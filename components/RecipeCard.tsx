import React,{Component, useState, useEffect} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';
import {Recipe} from '../models/Recipe';

type Props = {
    recipe: Recipe
};


const RecipeCard = ({recipe}: Props) => {
    return(
        <Card title={recipe.strMeal}
        
        >
           <View style={styles.container}>
                <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{ uri: recipe.strMealThumb }}
                />
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems:"center"
    },
    image: {
      width: 300,
      height: 200
    },
});

export default RecipeCard;