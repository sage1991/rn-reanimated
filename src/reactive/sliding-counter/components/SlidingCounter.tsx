import React, { FC, useCallback, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import Animated, {
  interpolate,
  measure,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"

import { clamp } from "../../../utils"

export const SlidingCounter: FC = () => {
  const translateX = useSharedValue<number>(0)
  const translateY = useSharedValue<number>(0)
  const rootRef = useAnimatedRef<View>()
  const knobRef = useAnimatedRef<Animated.View>()
  const [count, setCount] = useState<number>(0)

  const increment = useCallback(() => setCount((prev) => prev + 1), [])
  const decrement = useCallback(() => setCount((prev) => prev - 1), [])

  type PanGestureContext = { translateX: number; translateY: number }
  const handlePanGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PanGestureContext
  >({
    onStart: (_, context) => {
      context.translateX = translateX.value
      context.translateY = translateY.value
    },
    onActive: (event, context) => {
      const root = measure(rootRef)
      const knob = measure(knobRef)
      translateX.value = clamp(event.translationX + context.translateX, {
        min: -root.width / 2 + knob.width / 2,
        max: root.width / 2 - knob.width / 2
      })
      translateY.value = clamp(event.translationY + context.translateY, {
        min: -root.height,
        max: root.height
      })
    },
    onEnd: () => {
      const root = measure(rootRef)
      const knob = measure(knobRef)
      const min = -root.width / 2 + knob.width / 2
      const max = root.width / 2 - knob.width / 2

      if (translateX.value === min) {
        runOnJS(decrement)()
      }

      if (translateX.value === max) {
        runOnJS(increment)()
      }

      translateX.value = withSpring(0)
      translateY.value = withSpring(0)
    }
  })

  const animatedKnobStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }]
    }
  }, [])

  const animatedIconStyle = useAnimatedStyle(() => {
    let width: number = 0
    let knobWidth: number = 0
    try {
      width = measure(rootRef).width
      knobWidth = measure(knobRef).width
    } catch (e) {
      // Do Nothing
    }
    return {
      opacity: interpolate(
        translateX.value,
        [-width / 2 + knobWidth / 2, 0, width / 2 - knobWidth / 2],
        [0.4, 1, 0.4]
      )
    }
  }, [])

  return (
    <View ref={rootRef} style={styles.root}>
      <Animated.View style={animatedIconStyle}>
        <AntDesign name="minus" size={24} color="#ffffff" />
      </Animated.View>
      <AntDesign style={styles.icon} name="close" size={24} color="#ffffff" />
      <Animated.View style={animatedIconStyle}>
        <AntDesign name="plus" size={24} color="#ffffff" />
      </Animated.View>
      <View style={styles.knobContainer}>
        <PanGestureHandler onGestureEvent={handlePanGesture}>
          <Animated.View ref={knobRef} style={[styles.knob, animatedKnobStyle]}>
            <Text style={styles.count}>{count}</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    borderRadius: 50,
    backgroundColor: "#000000",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row"
  },
  icon: {
    marginHorizontal: 20
  },
  knobContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center"
  },
  knob: {
    height: 50,
    width: 50,
    backgroundColor: "#232323",
    borderRadius: 25,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center"
  },
  count: {
    fontSize: 25,
    color: "#ffffff"
  }
})
