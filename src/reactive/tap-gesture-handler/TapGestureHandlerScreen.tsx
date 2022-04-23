import React, { FC, useCallback } from "react"
import { ImageBackground, StyleSheet, View } from "react-native"
import {
  GestureHandlerRootView,
  HandlerStateChangeEvent,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
  State
} from "react-native-gesture-handler"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring
} from "react-native-reanimated"

export const TapGestureHandlerScreen: FC = () => {
  const scale = useSharedValue<number>(0)

  const onDoubleTapStateChange = useCallback(
    (e: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
      if (e.nativeEvent.state === State.ACTIVE) {
        scale.value = withSpring(1, undefined, (finished) => {
          if (finished) {
            scale.value = withDelay(500, withSpring(0, { overshootClamping: true }))
          }
        })
      }
    },
    [scale]
  )

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    }
  }, [])

  return (
    <GestureHandlerRootView style={styles.root}>
      <TapGestureHandler
        numberOfTaps={2}
        maxDelayMs={250}
        onHandlerStateChange={onDoubleTapStateChange}
      >
        <View>
          <ImageBackground style={styles.image} source={require("./assets/cold-brew.jpg")}>
            <Animated.Image
              style={[styles.like, animatedStyle]}
              source={require("./assets/like.png")}
            />
          </ImageBackground>
        </View>
      </TapGestureHandler>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  image: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  like: {
    width: 150,
    height: 150
  }
})
