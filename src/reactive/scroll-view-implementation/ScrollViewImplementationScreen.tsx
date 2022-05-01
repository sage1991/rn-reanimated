import React, { FC, useMemo } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay
} from "react-native-reanimated"

import { ReactiveNavigationParams } from "../../navigations"
import { Page } from "./components"

const WORDS: string[] = ["NICE", "ONE,", "SONNY!", "NICE", "ONE,", "SON!"]

type Props = StackScreenProps<ReactiveNavigationParams>

export const ScrollViewImplementationScreen: FC<Props> = () => {
  const translateX = useSharedValue<number>(0)
  const minTranslateX = useMemo(() => {
    return (WORDS.length - 1) * Dimensions.get("window").width
  }, [])

  type PanGestureContext = { translateX: number }
  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PanGestureContext
  >(
    {
      onStart: (event, context) => {
        context.translateX = translateX.value
        cancelAnimation(translateX)
      },
      onActive: (event, context) => {
        let computedTranslateX = event.translationX + context.translateX
        if (computedTranslateX >= 0) {
          computedTranslateX = 0
        } else if (computedTranslateX <= -1 * minTranslateX) {
          computedTranslateX = -1 * minTranslateX
        }
        translateX.value = computedTranslateX
      },
      onEnd: (event) => {
        translateX.value = withDecay({
          velocity: event.velocityX,
          clamp: [-1 * minTranslateX, 0],
          deceleration: 0.999
        })
      }
    },
    [minTranslateX]
  )

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }]
    }
  }, [minTranslateX])

  return (
    <View style={styles.root}>
      <PanGestureHandler onGestureEvent={panGestureHandler}>
        <Animated.View style={[styles.scrollRoot, animatedStyle]}>
          {WORDS.map((word, index) => (
            <Page key={index} index={index} title={word} />
          ))}
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  scrollRoot: {
    flex: 1,
    flexDirection: "row"
  }
})
