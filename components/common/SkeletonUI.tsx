
import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Animated } from 'react-native';

//Props for skeleton component
interface  SkeletonProps {
  height: number
}

const  SkeletonUI  = ({height}: SkeletonProps) => {
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 1],
  });

  useEffect(()=>{
    Animated.loop(
      Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
      })
  ).start();
  },[]);

  return (
   <View>
      <Animated.View style={[styles.skeleton, {height: height }, { opacity }]} />
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  skeleton: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    marginVertical: 5,
  },
});

export default SkeletonUI;