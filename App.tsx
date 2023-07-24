/**
 * React native recipes application
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

//Screens
import RecipeList from './screens/RecipeList';
import RecipeDetail from './screens/RecipeDetail';
import RecipeFavorite from './screens/RecipeFavorite';
import store from './store';

/* Store addition */

/* Store addition finish */
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const HomeScreen = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="List" component={RecipeList} />
      <Stack.Screen name="Detail" component={RecipeDetail} />
   </Stack.Navigator>
  )
}

const FavoriteScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={RecipeFavorite} />
      <Stack.Screen name="Detail" component={RecipeDetail} />
    </Stack.Navigator>  
  )

}

const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false
    }}>
      <Tab.Screen name="ItemList" component={HomeScreen} options = {{ tabBarLabel:"List", tabBarIcon: ({ color, size }) => <Icon name='list' color={color}  size={18}  /> }} />
      <Tab.Screen name="Favorites" component={FavoriteScreen}  options = {{ tabBarLabel:"Favorites", tabBarIcon: ({ color, size }) => <Icon name='heart' color={color}  size={18}  /> }} />
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

export default App;
