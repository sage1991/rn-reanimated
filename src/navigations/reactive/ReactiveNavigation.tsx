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
  ColorPickerScreen
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
    </Stack.Navigator>
  )
}
