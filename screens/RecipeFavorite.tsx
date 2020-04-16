import React,{Component, useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, AsyncStorage} from 'react-native';
import {SearchBar, Button} from 'react-native-elements';
import {ActionCreators} from '../actions';
import {bindActionCreators} from 'redux';

interface FavoriteProps {
    navigation: any,
    fetchFavorites: any
 };
 
 interface FavoriteState {
     isLoading: any,
     recipe: any
 };
 
 class RecipeFavorite extends Component<FavoriteProps, FavoriteState> {
    
    constructor(props: FavoriteProps) {
        super(props);
    }

    render() {
        return(
            <View>
                <Text>Favorite Screen</Text>
            </View>
        );
    }
    
 }

 export default RecipeFavorite;