import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

type IngredientProps = {
	ingredient: {
		ingredient: string,
		portion: string,
		ingredientUrl: string
	}
};

const RecipeIngredient = ({ingredient}: IngredientProps)  => {
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