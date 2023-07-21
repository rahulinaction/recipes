import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';

type IngredientProps = {
	ingredientContent: {
		ingredient: string,
		portion: string,
		ingredientUrl: string
	}
};

const RecipeIngredient = ({ingredientContent}: IngredientProps)  => {

  const {ingredient, portion} = ingredientContent;

	return (
    <Container>
      <Component>
        <LeftText>{ingredient}</LeftText>
      </Component>
      <Component>
        <RightText>{portion}</RightText>
      </Component>
    </Container>
	)
};

//Styling
const Component = styled.View`
flex: 1;
height: 30px;
`
const LeftText = styled.Text`
  text-align: left;
`
const RightText = styled.Text` 
  text-align: right;`

const Container =styled.View`
flex: 1;
flex-direction: row;
`

export default RecipeIngredient;