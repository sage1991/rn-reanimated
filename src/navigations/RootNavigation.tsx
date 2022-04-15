import React, { FC } from "react"
import { NavigatorScreenParams } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import { HomeNavigation, HomeNavigationParams } from "./home"
import { ReactiveNavigation, ReactiveNavigationParams } from "./reactive"

export type RootNavigationParams = {
  home: NavigatorScreenParams<HomeNavigationParams>
  "reactive-stack": NavigatorScreenParams<ReactiveNavigationParams>
}

const Stack = createStackNavigator<RootNavigationParams>()

export const RootNavigation: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="home" component={HomeNavigation} />
    <Stack.Screen name="reactive-stack" component={ReactiveNavigation} />
  </Stack.Navigator>
)
