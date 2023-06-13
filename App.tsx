/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';

//Screens
import RecipeList from './screens/RecipeList';
import RecipeDetail from './screens/RecipeDetail';
import RecipeFavorite from './screens/RecipeFavorite';
import configureStore from './store';

/* Store addition */
const store = configureStore({});
/* Store addition finish */
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const HomeScreen = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="List" component={RecipeList} />
      <Stack.Screen name="Detail" component={RecipeDetail} />
   </Stack.Navigator>
  )
}

const FavoriteScreen = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="List" component={RecipeFavorite} />
      <Stack.Screen name="Detail" component={RecipeDetail} />
    </Stack.Navigator>  
  )

}

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="listFlow" component={HomeScreen} />
      <Tab.Screen name="favoriteFlow" component={FavoriteScreen} />
    </Tab.Navigator>
  )
}


//Main app component
const  App = ()=> {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    </Provider>  
  );

}

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
