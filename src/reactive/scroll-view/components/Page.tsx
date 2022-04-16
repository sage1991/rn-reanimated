import React, { FC, useMemo } from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle
} from "react-native-reanimated"

const SCREEN_WIDTH = Dimensions.get("window").width
const BOX_SIZE = SCREEN_WIDTH * 0.7

interface Props {
  title: string
  index: number
  translateX: SharedValue<number>
}

export const Page: FC<Props> = (props) => {
  const animatedInputRange = useMemo(() => {
    return [
      (props.index - 1) * SCREEN_WIDTH,
      props.index * SCREEN_WIDTH,
      (props.index + 1) * SCREEN_WIDTH
    ]
  }, [props.index])

  const animatedBoxStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      props.translateX.value,
      animatedInputRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    )
    const borderRadius = interpolate(
      props.translateX.value,
      animatedInputRange,
      [0, BOX_SIZE / 2, 0],
      Extrapolation.CLAMP
    )
    return {
      transform: [{ scale }],
      borderRadius
    }
  }, [props.translateX, animatedInputRange])

  const animatedTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      props.translateX.value,
      animatedInputRange,
      [200, 0, -200],
      Extrapolation.CLAMP
    )
    const opacity = interpolate(
      props.translateX.value,
      animatedInputRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    )
    return {
      transform: [{ translateY }],
      opacity
    }
  }, [props.translateX, animatedInputRange])

  return (
    <View style={[styles.root, { backgroundColor: `rgba(0, 0, 255, 0.${props.index})` }]}>
      <Animated.View style={[styles.square, animatedBoxStyle]} />
      <Animated.Text style={[styles.text, animatedTextStyle]}>{props.title}</Animated.Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: SCREEN_WIDTH,
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  square: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: "rgba(0, 0, 255, 0.4)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible"
  },
  text: {
    fontSize: 60,
    fontWeight: "700",
    color: "#ffffff",
    position: "absolute"
  }
})
