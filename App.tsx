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
import { RootStackParamList } from './RootStackParams';
import { realmContext} from './schema/realm';
//Screens
import RecipeList from './screens/RecipeList';
import RecipeDetail from './screens/RecipeDetail';
import RecipeFavorite from './screens/RecipeFavorite';
import IngredientsList from './screens/IngredientsList';
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
      <Stack.Screen name="IngredientsList" component={IngredientsList} />
      <Stack.Screen name="IngredientsDetail" component={RecipeDetail} />
   </Stack.Navigator>
  )
}

const FavoriteScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FavoritesList" component={RecipeFavorite} />
      <Stack.Screen name="FavoriteDetail" component={RecipeDetail} />
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
  const {RealmProvider} = realmContext;
   
  return (
    <Provider store={store}>
      <RealmProvider>
        <NavigationContainer>
          <AppNavigator/>
        </NavigationContainer>
      </RealmProvider>
    </Provider>  
  );
}

export default App;
