import React, { FC } from "react"
import { createStackNavigator } from "@react-navigation/stack"

import {
  PanGestureHandlerScreen,
  IntroScreen,
  ScrollViewScreen,
  InterpolateColorsScreen
} from "../../reactive"

export type ReactiveNavigationParams = {
  intro: undefined
  "pan-gesture-handler": undefined
  "scroll-view": undefined
  "interpolate-colors": undefined
}

const Stack = createStackNavigator<ReactiveNavigationParams>()

export const ReactiveNavigation: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="intro" component={IntroScreen} />
      <Stack.Screen name="pan-gesture-handler" component={PanGestureHandlerScreen} />
      <Stack.Screen name="scroll-view" component={ScrollViewScreen} />
      <Stack.Screen name="interpolate-colors" component={InterpolateColorsScreen} />
    </Stack.Navigator>
  )
}
