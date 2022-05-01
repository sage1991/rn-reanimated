import React, { FC } from "react"
import { StyleSheet, View, Dimensions } from "react-native"
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"

const BOX_SIZE = 100
const CIRCLE_RADIUS = Dimensions.get("window").width * 0.9

export const PanGestureHandlerScreen: FC = () => {
  const translateX = useSharedValue<number>(0)
  const translateY = useSharedValue<number>(0)

  type PanGestureContext = {
    translateX: number
    translateY: number
  }
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PanGestureContext
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value
      context.translateY = translateY.value
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX
      translateY.value = event.translationY + context.translateY
    },
    onEnd: (event) => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2)
      if (distance < CIRCLE_RADIUS / 2) {
        translateX.value = withSpring(0)
        translateY.value = withSpring(0)
      }
    }
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }]
    }
  }, [])

  return (
    <View style={styles.root}>
      <View style={styles.circle} />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.square, animatedStyle]} />
      </PanGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  square: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: "rgba(0, 0, 255, 0.5)",
    borderRadius: 20
  },
  circle: {
    width: CIRCLE_RADIUS,
    height: CIRCLE_RADIUS,
    borderRadius: CIRCLE_RADIUS / 2,
    borderWidth: 5,
    borderColor: "rgba(0, 0, 255, 0.5)",
    position: "absolute"
  }
})
