import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React, { useState } from "react";
import Animated, {
  clamp,
  SharedValue,
  Easing,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
const Card = ({ card, index, scrollY, activeCardIndex }) => {
  const [cardHeight, setCardHeight] = useState(0);
  const translateY = useSharedValue(0);
  const { height: screenHeight } = useWindowDimensions();
  useAnimatedReaction(
    () => {
      return scrollY.value;
    },
    (cur, prev) => {
      translateY.value = clamp(-cur, -index * cardHeight, 0);
    }
  );
  //   const translateDerivedValue = useDerivedValue(() =>
  //     clamp(-scrollY.value, -index * cardHeight, 0)
  //   );
  useAnimatedReaction(
    () => {
      return activeCardIndex.value;
    },
    (cur, prev) => {
      if (cur === prev) {
        return;
      }

      if (activeCardIndex.value == null) {
        translateY.value = withTiming(
          clamp(-scrollY.value, -index * cardHeight, 0)
        );
      }else if(activeCardIndex.value === index){
        translateY.value = withTiming(-index * cardHeight, {
          duration: 500,
          easing: Easing.out(Easing.quad),
        });
      }
       else {
        translateY.value = withTiming(
          -index * cardHeight * 0.9 + screenHeight * 0.7,
          {
            duration: 500,
            easing: Easing.out(Easing.quad),
          }
        );
      }
    }
  );
  const tap = Gesture.Tap().onEnd((e) => {
    if (activeCardIndex.value === null) {
      activeCardIndex.value = index;
    } else {
      activeCardIndex.value = null;
    }
  });
  return (
    <GestureDetector gesture={tap}>
      <Animated.Image
        onLayout={(e) => setCardHeight(e.nativeEvent.layout.height + 10)}
        source={card}
        style={[
          styles.card,
          {
            transform: [{ translateY: translateY }],
          },
        ]}
      />
    </GestureDetector>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: undefined,
    aspectRatio: 7 / 4,
    marginVertical: 5,
  },
});
