import React, { useEffect, useState} from "react";
import { View, ScrollView} from 'react-native';
import {Card, Image, Divider} from 'react-native-elements';

import SkeletonUI  from './SkeletonUI';
const SkeletonList = () => {
  return (
    <View  style={{flex:1}}>
      <ScrollView>
        <Card><SkeletonUI height={300}/></Card>
        <Card><SkeletonUI height={300}/ ></Card>
      </ScrollView>
    </View>
  )
}

export default SkeletonList;