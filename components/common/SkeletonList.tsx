import React from "react";
import { View} from 'react-native';
import {Card} from 'react-native-elements';
import styled from "styled-components/native";

import SkeletonUI  from './SkeletonUI';
const SkeletonList = () => {
  return (
    <View>
      <CardList>
        <Card><SkeletonUI height={300}/></Card>
        <Card><SkeletonUI height={300}/></Card>
      </CardList>
    </View>
  )
}

const CardList = styled.ScrollView`
margin-horizontal: 7px;
`
export default SkeletonList;