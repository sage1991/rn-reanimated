import React, { FC } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import Animated, {
  Extrapolation,
  interpolate,
  measure,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated"
import { Gesture, GestureDetector } from "react-native-gesture-handler"

import { BackgroundGradient } from "./components"

const { width: screenWidth } = Dimensions.get("window")
const WIDTH = screenWidth * 0.9
const HEIGHT = WIDTH * 0.7
const CANVAS_PADDING = 10

export const ThreeDCardAnimationScreen: FC = () => {
  const card = useAnimatedRef<Animated.View>()
  const rotateX = useSharedValue(0)
  const rotateY = useSharedValue(0)

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      const { width, height } = measure(card)
      rotateX.value = interpolate(event.y, [0, height], [10, -10], Extrapolation.CLAMP)
      rotateY.value = interpolate(event.x, [0, width], [-10, 10], Extrapolation.CLAMP)
    })
    .onEnd(() => {
      rotateY.value = withSpring(0, { stiffness: 200 })
      rotateX.value = withSpring(0, { stiffness: 200 })
    })

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      width: WIDTH - CANVAS_PADDING * 2,
      height: HEIGHT - CANVAS_PADDING * 2,
      transform: [
        { perspective: 300 },
        { rotateX: `${rotateX.value}deg` },
        { rotateY: `${rotateY.value}deg` }
      ]
    }
  }, [])

  return (
    <View style={styles.root}>
      <BackgroundGradient width={WIDTH} height={HEIGHT} padding={CANVAS_PADDING} />
      <GestureDetector gesture={gesture}>
        <Animated.View ref={card} style={[styles.card, animatedCardStyle]}>
          <View style={styles.logo} />
          <View />
          <View style={styles.magnetic} />
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000"
  },
  card: {
    backgroundColor: "#000000",
    position: "absolute",
    borderRadius: 20,
    zIndex: 300
  },
  logo: {
    position: "absolute",
    top: "7%",
    right: "4%",
    aspectRatio: 1,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#272f46"
  },
  magnetic: {
    position: "absolute",
    bottom: "10%",
    height: 40,
    width: "100%",
    backgroundColor: "#272f46"
  }
})
