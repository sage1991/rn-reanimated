import React, { FC } from "react"
import { StyleSheet } from "react-native"
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent
} from "react-native-gesture-handler"
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"

const IMAGE_URL =
  "https://images.unsplash.com/photo-1587502536575-6dfba0a6e017?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"

export const PinchGestureHandlerScreen: FC = () => {
  const scale = useSharedValue<number>(1)

  const pinchHandler = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>(
    {
      onActive: (event) => {
        if (event.scale < 0.7 || event.scale > 2) {
          return
        }
        scale.value = event.scale
      },
      onEnd: () => {
        scale.value = withTiming(1)
      }
    },
    [scale]
  )

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    }
  }, [scale])

  return (
    <GestureHandlerRootView style={styles.root}>
      <PinchGestureHandler onGestureEvent={pinchHandler}>
        <Animated.Image style={[styles.image, animatedImageStyle]} source={{ uri: IMAGE_URL }} />
      </PinchGestureHandler>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
})
