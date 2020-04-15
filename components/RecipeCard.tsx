import React,{Component, useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Image} from 'react-native-elements';
import {Recipe} from '../models/Recipe';
import { ActivityIndicator } from 'react-native';
type Props = {
    recipe: Recipe,
    callRecipe: any
};


const RecipeCard = ({recipe,callRecipe}: Props) => {
    return(
        < TouchableOpacity onPress={()=>{ callRecipe(recipe.idMeal) }}>
            <Card title={recipe.strMeal}
            >
            <View style={styles.container}>
                    <Image
                        resizeMode="cover"
                        style={styles.image}
                        PlaceholderContent={<ActivityIndicator />}
                        source={{ uri: recipe.strMealThumb }}
                    />
                </View>
            </Card>
        </ TouchableOpacity>
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