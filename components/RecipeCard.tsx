import React,{Component, useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Image, Divider} from 'react-native-elements';
import {Recipe} from '../models/Recipe';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
type Props = {
    recipe: Recipe,
    callRecipe: any,
    size: number,
    likeRecipe: any
};


const RecipeCard = ({recipe,size,callRecipe, likeRecipe}: Props) => {
    
    let likeColor = "#000";

    if(recipe.favorite) {
        likeColor = "#FF0000";
    }

    return(
        < TouchableOpacity onPress={()=>{ callRecipe(recipe.idMeal) }}>
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
                    <View style={{flex:1, flexDirection:"row",padding: 10 }}>
                        <View style={{flex:1 }}>
                            <Text>Like:</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Icon name='heart' color={likeColor} onPress={() => likeRecipe(recipe.idMeal)} />
                        </View>
                    </View>    
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