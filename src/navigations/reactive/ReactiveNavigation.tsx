import React, { FC } from "react"
import { createStackNavigator } from "@react-navigation/stack"

import { GestureHandlerBasicScreen, IntroScreen, ScrollViewScreen } from "../../reactive"

export type ReactiveNavigationParams = {
  intro: undefined
  "gesture-handler-basic": undefined
  "scroll-view": undefined
}

const Stack = createStackNavigator<ReactiveNavigationParams>()

export const ReactiveNavigation: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="intro" component={IntroScreen} />
      <Stack.Screen name="gesture-handler-basic" component={GestureHandlerBasicScreen} />
      <Stack.Screen name="scroll-view" component={ScrollViewScreen} />
    </Stack.Navigator>
  )
}
