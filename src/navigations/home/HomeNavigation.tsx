import React, { FC } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { ReactiveHomeScreen } from "../../reactive"

export type HomeNavigationParams = {
  reactive: undefined
}

const BottomTab = createBottomTabNavigator<HomeNavigationParams>()

export const HomeNavigation: FC = () => (
  <BottomTab.Navigator screenOptions={{ headerShown: false }}>
    <BottomTab.Screen name="reactive" component={ReactiveHomeScreen} />
  </BottomTab.Navigator>
)
