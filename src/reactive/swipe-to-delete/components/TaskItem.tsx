import React, { FC } from "react"
import { Dimensions, StyleSheet, Text } from "react-native"
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps
} from "react-native-gesture-handler"
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  useWorkletCallback,
  withSpring,
  withTiming
} from "react-native-reanimated"
import { FontAwesome } from "@expo/vector-icons"

import { clamp } from "../../../utils"

const ITEM_SIZE = 70
const SCREEN_WIDTH = Dimensions.get("window").width
const THRESHOLD = SCREEN_WIDTH / 3

interface Props extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  onDismiss: (text: string) => void
  children: string
}

export const TaskItem: FC<Props> = (props) => {
  const translateX = useSharedValue<number>(0)
  const itemHeight = useSharedValue<number>(ITEM_SIZE)
  const marginVertical = useSharedValue<number>(10)
  const opacity = useSharedValue<number>(0)

  const removeItemAnimation = useWorkletCallback(() => {
    translateX.value = withTiming(-SCREEN_WIDTH)
    itemHeight.value = withTiming(0)
    marginVertical.value = withTiming(0)
    opacity.value = withTiming(0, undefined, (finished) => {
      if (finished) {
        runOnJS(props.onDismiss)(props.children)
      }
    })
  }, [])

  type PanGestureContext = { translateX: number }
  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PanGestureContext
  >(
    {
      onStart: (_, context) => {
        cancelAnimation(translateX)
        context.translateX = translateX.value
      },
      onActive: (event, context) => {
        const nextTranslateX = event.translationX + context.translateX
        if (nextTranslateX < 0) {
          translateX.value = nextTranslateX
          opacity.value = clamp(Math.abs(nextTranslateX) / THRESHOLD, { min: 0, max: 1 })
        }
      },
      onEnd: () => {
        if (Math.abs(translateX.value) < THRESHOLD) {
          translateX.value = withSpring(0)
        } else {
          removeItemAnimation()
        }
      }
    },
    []
  )

  const animatedTranslate = useAnimatedStyle(
    () => ({
      transform: [{ translateX: translateX.value }]
    }),
    []
  )

  const animatedOpacity = useAnimatedStyle(
    () => ({
      opacity: opacity.value
    }),
    []
  )

  const animatedItemSize = useAnimatedStyle(
    () => ({
      height: itemHeight.value,
      marginVertical: marginVertical.value
    }),
    []
  )

  return (
    <Animated.View style={[styles.root, animatedItemSize]}>
      <Animated.View style={[styles.iconRoot, animatedOpacity]}>
        <FontAwesome name="trash" size={ITEM_SIZE / 3} color="red" />
      </Animated.View>
      <PanGestureHandler
        simultaneousHandlers={props.simultaneousHandlers}
        onGestureEvent={panGestureHandler}
      >
        <Animated.View style={[styles.contentsRoot, animatedTranslate]}>
          <Text style={styles.text}>{props.children}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: ITEM_SIZE,
    marginVertical: 10,
    alignItems: "center"
  },
  contentsRoot: {
    width: "90%",
    height: ITEM_SIZE,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cecece",
    // ios
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowRadius: 10,
    // android
    elevation: 5
  },
  text: {
    fontSize: 16
  },
  iconRoot: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    position: "absolute",
    right: "5%",
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
})
