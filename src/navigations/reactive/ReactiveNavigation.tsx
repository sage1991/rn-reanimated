import React, { FC } from "react"
import { createStackNavigator } from "@react-navigation/stack"

import {
  PanGestureHandlerScreen,
  IntroScreen,
  ScrollViewScreen,
  InterpolateColorsScreen,
  PinchGestureHandlerScreen,
  TapGestureHandlerScreen
} from "../../reactive"

export type ReactiveNavigationParams = {
  intro: undefined
  "pan-gesture-handler": undefined
  "scroll-view": undefined
  "interpolate-colors": undefined
  "pinch-gesture-handler": undefined
  "tap-gesture-handler": undefined
}

const Stack = createStackNavigator<ReactiveNavigationParams>()

export const ReactiveNavigation: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="intro" component={IntroScreen} />
      <Stack.Screen name="pan-gesture-handler" component={PanGestureHandlerScreen} />
      <Stack.Screen name="scroll-view" component={ScrollViewScreen} />
      <Stack.Screen name="interpolate-colors" component={InterpolateColorsScreen} />
      <Stack.Screen name="pinch-gesture-handler" component={PinchGestureHandlerScreen} />
      <Stack.Screen name="tap-gesture-handler" component={TapGestureHandlerScreen} />
    </Stack.Navigator>
  )
}
