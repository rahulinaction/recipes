/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducer from './reducers';

//Screens
import RecipeList from './screens/RecipeList';
import RecipeDetail from './screens/RecipeDetail';
import RecipeFavorite from './screens/RecipeFavorite';

import configureStore from './store';

/* Store addition */

const store = configureStore({});

/* Store addition finish */

const  App = ()=> {
  
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>  
  );

}



const AppNavigator = createBottomTabNavigator({
  
    listFlow: createStackNavigator({
      List: RecipeList,
      Detail: RecipeDetail
    }),
    favoriteFlow: createStackNavigator({
      Favorite: RecipeFavorite,
      Detail: RecipeDetail
    })
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    
  }),
  initialRouteName: 'listFlow'
}

)


let Navigation = createAppContainer(AppNavigator);


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
