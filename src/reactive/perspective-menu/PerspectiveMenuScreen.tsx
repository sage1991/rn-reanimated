import React, { FC, useCallback } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import Animated, {
  cancelAnimation,
  Extrapolation,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"
import { Dimensions, StyleSheet, View } from "react-native"
import { Feather } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"

import { ReactiveNavigationParams } from "../../navigations"
import { clamp } from "../../utils"

const { width: SCREEN_WIDTH } = Dimensions.get("window")
const THRESHOLD = SCREEN_WIDTH * 0.3

type Props = StackScreenProps<ReactiveNavigationParams, "perspective-menu">

export const PerspectiveMenuScreen: FC<Props> = () => {
  const translateX = useSharedValue(0)

  type PanGestureContext = { translateX: number }
  const handlePanGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PanGestureContext
  >({
    onStart: (_, context) => {
      cancelAnimation(translateX)
      context.translateX = translateX.value
    },
    onActive: (event, context) => {
      translateX.value = clamp(event.translationX + context.translateX, {
        min: -SCREEN_WIDTH,
        max: 0
      })
    },
    onEnd: () => {
      if (translateX.value <= -THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH / 2)
      }

      if (translateX.value > -THRESHOLD) {
        translateX.value = withTiming(0)
      }
    }
  })

  const animatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 2, 0],
      [3, 0],
      Extrapolation.CLAMP
    )
    const borderRadius = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 2, 0],
      [15, 0],
      Extrapolation.CLAMP
    )

    return {
      transform: [
        { perspective: 100 },
        { translateX: translateX.value },
        { rotateY: `${rotateY}deg` }
      ],
      borderRadius
    }
  }, [])

  const toggleMenu = useCallback(() => {
    if (translateX.value <= -THRESHOLD) {
      translateX.value = withTiming(0)
    }

    if (translateX.value > -THRESHOLD) {
      translateX.value = withTiming(-SCREEN_WIDTH / 2)
    }
  }, [])

  return (
    <PanGestureHandler onGestureEvent={handlePanGesture} hitSlop={{ left: -50 }}>
      <Animated.View style={[styles.root, animatedStyle]}>
        <SafeAreaView style={styles.paper}>
          <View style={styles.menuContainer}>
            <Feather name="menu" size={24} color="#000000" onPress={toggleMenu} />
          </View>
        </SafeAreaView>
      </Animated.View>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  paper: {
    flex: 1
  },
  menuContainer: {
    flexDirection: "row-reverse",
    paddingHorizontal: 15,
    paddingVertical: 10
  }
})
