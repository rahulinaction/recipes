
import {Button} from 'react-native-elements';

import styled from 'styled-components/native';
//Adding styled components
export const Container = styled.View`
  flex:1;
`;

export const StyledFlatList = styled.FlatList`
  marginHorizontal: 10;
`
export const ListButton = styled(Button).attrs({
  containerStyle: {
    marginBottom:15
  }
})``

export const ButtonContainer = styled.View`
padding-horizontal: 20px`;


export const SelectContainer = styled.View`
margin-top: 40px;
height: 50px;
margin-bottom: 40px;
margin-horizontal: 20px;
padding: 10px;
border-color:red;
border-width:1px;
border-radius: 4px;
`;

