import React, { FC } from "react"
import { createStackNavigator } from "@react-navigation/stack"

import {
  PanGestureHandlerScreen,
  IntroScreen,
  AnimatedScrollViewScreen,
  InterpolateColorsScreen,
  PinchGestureHandlerScreen,
  TapGestureHandlerScreen,
  ScrollViewImplementationScreen,
  ColorPickerScreen,
  SvgAndTextScreen,
  SwipeToDeleteScreen,
  RippleScreen,
  PerspectiveMenuScreen,
  SlidingCounterScreen
} from "../../reactive"

export type ReactiveNavigationParams = {
  intro: undefined
  "pan-gesture-handler": undefined
  "animated-scroll-view": undefined
  "interpolate-colors": undefined
  "pinch-gesture-handler": undefined
  "tap-gesture-handler": undefined
  "scroll-view-implementation": undefined
  "color-picker": undefined
  "svg-and-text": undefined
  "swipe-to-delete": undefined
  ripple: undefined
  "perspective-menu": undefined
  "sliding-counter": undefined
}

const Stack = createStackNavigator<ReactiveNavigationParams>()

export const ReactiveNavigation: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="intro" component={IntroScreen} />
      <Stack.Screen name="pan-gesture-handler" component={PanGestureHandlerScreen} />
      <Stack.Screen name="animated-scroll-view" component={AnimatedScrollViewScreen} />
      <Stack.Screen name="interpolate-colors" component={InterpolateColorsScreen} />
      <Stack.Screen name="pinch-gesture-handler" component={PinchGestureHandlerScreen} />
      <Stack.Screen name="tap-gesture-handler" component={TapGestureHandlerScreen} />
      <Stack.Screen name="scroll-view-implementation" component={ScrollViewImplementationScreen} />
      <Stack.Screen name="color-picker" component={ColorPickerScreen} />
      <Stack.Screen name="svg-and-text" component={SvgAndTextScreen} />
      <Stack.Screen name="swipe-to-delete" component={SwipeToDeleteScreen} />
      <Stack.Screen name="ripple" component={RippleScreen} />
      <Stack.Screen
        name="perspective-menu"
        options={{ headerShown: false, cardStyle: { backgroundColor: "#000000" } }}
        component={PerspectiveMenuScreen}
      />
      <Stack.Screen name="sliding-counter" component={SlidingCounterScreen} />
    </Stack.Navigator>
  )
}
