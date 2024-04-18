import { FlatList, Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useState } from 'react'
import { Gesture,GestureDetector } from 'react-native-gesture-handler'
import Animated,{ cancelAnimation, SharedValue, useSharedValue, withDecay,clamp,withClamp } from 'react-native-reanimated'
import Card from './Card'
const cardsArray = [
    require("../../assets/cards/Card 1.png"),
    require("../../assets/cards/Card 2.png"),
    require("../../assets/cards/Card 3.png"),
    require("../../assets/cards/Card 4.png"),
    require("../../assets/cards/Card 5.png"),
    require("../../assets/cards/Card 6.png"),
    require("../../assets/cards/Card 7.png"),
    require("../../assets/cards/Card 8.png"),
    require("../../assets/cards/Card 9.png"),
 
]
const CardList = () => {
    const [listHeight,setListHeight] = useState(0)
    const {height:screenHeight} = useWindowDimensions()
    const maxScrollY = listHeight - screenHeight + 70
    const scrollY = useSharedValue(0)
    const activeCardIndex = useSharedValue(null)
    const pan = Gesture.Pan()
      .onBegin((e) => {
        cancelAnimation(scrollY);
      })
      .onStart((e) => {})
      .onChange((e) => {
        scrollY.value = clamp(scrollY.value - e.changeY, 0, maxScrollY);
      })
      .onEnd((e) => {
        scrollY.value = withClamp(
          { min: 0, max: maxScrollY },
          withDecay({ velocity: -e.velocityY })
        );
      });
  return (
    <GestureDetector gesture={pan}>
      <View style={{ padding: 10 }} onLayout={(e)=>setListHeight(e.nativeEvent.layout.height)}>
        {cardsArray.map((card, index) => {
          return <Card card={card} index={index} scrollY={scrollY} key={index} activeCardIndex={activeCardIndex} />;
        })}
      </View>
    </GestureDetector>
  );
}

export default CardList

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: undefined,
    aspectRatio: 7 / 4,
    marginVertical:5
  },
});