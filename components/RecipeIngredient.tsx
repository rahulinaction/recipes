import React,{Component, useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Image} from 'react-native-elements';
import {Recipe} from '../models/Recipe';
import { ActivityIndicator } from 'react-native';

type Props = {
    ingredient: any
};

const RecipeIngredient = ({ingredient}: Props)  => {
    return (
        <View style={styles.container}>
            <View style={styles.component}>
                <Text>{ingredient.ingredient}</Text>
            </View>
            <View style={styles.component}>
                <Text>{ingredient.portion}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    },
    component: {
        flex: 1,
        height: 30
    }
});

export default RecipeIngredient;